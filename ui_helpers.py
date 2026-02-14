import contextlib
import io
import sys

import streamlit as st

_BASE_SIDEBAR_CSS = """
<style>
/* Fix sidebar width to prevent layout jumps */
/* Make ALL sidebar buttons clean, full-width, and non-leaky */
[data-testid="stSidebar"] .stButton > button {
  width: 100% !important;
  max-width: 100% !important;
  border-radius: 12px;
  padding: 0.55rem 0.95rem;
  line-height: 1.2;
  white-space: normal !important;    /* allow wrapping */
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* Provide consistent vertical rhythm */
[data-testid="stSidebar"] .stButton { margin-bottom: .35rem; }

/* Inputs/selects full width consistency */
[data-testid="stSidebar"] [data-baseweb="select"] { width: 100% !important; }
[data-testid="stSidebar"] input[type="text"],
[data-testid="stSidebar"] input[type="number"] {
  width: 100% !important;
  border-radius: 10px;
}

/* Remove the 3-column grid from earlier patch to avoid cramped rows */
[data-testid="stSidebar"] .btn-row {
  display: block; /* fallback to natural stacking */
}

/* Force any Streamlit column layout inside the sidebar to stack vertically */
[data-testid="stSidebar"] [data-testid="column"] {
  flex: 0 0 100% !important;
  width: 100% !important;
}
[data-testid="stSidebar"] [data-testid="stHorizontalBlock"] { gap: 0.25rem !important; }
</style>
"""

_BUTTON_ROW_CSS = """
<style>
/* Fix sidebar width to prevent layout jumps */
/* keep button text on one line and make them pretty */
[data-testid="stSidebar"] .stButton > button {
  white-space: nowrap;
  border-radius: 10px;
}
/* 3-button row (Load / Forget / Clear) */
[data-testid="stSidebar"] .btn-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
}
</style>
"""


def inject_sidebar_base_css() -> None:
    st.markdown(_BASE_SIDEBAR_CSS, unsafe_allow_html=True)


def inject_button_row_css() -> None:
    st.markdown(_BUTTON_ROW_CSS, unsafe_allow_html=True)


def _ensure_state_defaults() -> None:
    if "_dbg_sections" not in st.session_state:
        st.session_state._dbg_sections = []
    if "_show_debug_inline" not in st.session_state:
        st.session_state._show_debug_inline = False
    if "_caption_patched" not in st.session_state:
        st.session_state._caption_patched = False


def install_caption_debug_capture() -> None:
    """Patch st.caption once so hidden debug text is collected for later review."""
    _ensure_state_defaults()
    if st.session_state._caption_patched:
        return

    original_caption = st.caption

    def _guarded_caption(*args, **kwargs):
        _ensure_state_defaults()
        if st.session_state._show_debug_inline:
            return original_caption(*args, **kwargs)
        if args:
            st.session_state._dbg_sections.append(("", str(args[0])))
        return None

    st.caption = _guarded_caption
    st.session_state._caption_patched = True


@contextlib.contextmanager
def capture_debug(title: str):
    """
    Collect print/stdout output inside a block and store it for the debug panel.
    """
    _ensure_state_defaults()
    old_stdout = sys.stdout
    buf = io.StringIO()
    sys.stdout = buf
    try:
        yield
    finally:
        sys.stdout = old_stdout
        text = buf.getvalue().strip()
        if text:
            st.session_state._dbg_sections.append((title, text))


def append_debug(msg: str) -> None:
    _ensure_state_defaults()
    st.session_state._dbg_sections.append(("", str(msg)))


def render_debug_panel() -> None:
    _ensure_state_defaults()
    if not st.session_state._dbg_sections:
        return

    with st.expander("Display diagnostics (click to expand)"):
        for title, text in st.session_state._dbg_sections:
            if title:
                st.markdown(f"**{title}**")
            st.code(text)
        c1, c2 = st.columns([1, 1])
        with c1:
            if st.button("Clear diagnostics"):
                st.session_state._dbg_sections = []
        with c2:
            st.session_state._show_debug_inline = st.toggle(
                "Show diagnostics inline",
                value=st.session_state._show_debug_inline,
                help="If on, captions/prints render inline as usual.",
            )
