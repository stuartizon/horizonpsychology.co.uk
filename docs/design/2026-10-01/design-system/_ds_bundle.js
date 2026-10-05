/* @ds-bundle: {"format":4,"namespace":"HorIZONPsychologyDesignSystem_bf71c7","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Faqs","sourcePath":"components/content/Faqs.jsx"},{"name":"PublicationItem","sourcePath":"components/content/PublicationItem.jsx"},{"name":"Quote","sourcePath":"components/content/Quote.jsx"},{"name":"ServiceCard","sourcePath":"components/content/ServiceCard.jsx"},{"name":"TestimonialCard","sourcePath":"components/content/TestimonialCard.jsx"},{"name":"TestimonialCarousel","sourcePath":"components/content/TestimonialCarousel.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"Container","sourcePath":"components/core/Container.jsx"},{"name":"CredentialBadge","sourcePath":"components/core/CredentialBadge.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"StarRating","sourcePath":"components/core/StarRating.jsx"},{"name":"Footer","sourcePath":"components/footer/Footer.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"MobileMenu","sourcePath":"components/navigation/MobileMenu.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"fc0bc442699b","components/content/Faqs.jsx":"384f618cfda7","components/content/PublicationItem.jsx":"240d258bb5a6","components/content/Quote.jsx":"0a36db5b3e23","components/content/ServiceCard.jsx":"d3a8511dc317","components/content/TestimonialCard.jsx":"88a85505e91b","components/content/TestimonialCarousel.jsx":"4c2f00601807","components/core/Button.jsx":"016ac9eec3ff","components/core/Callout.jsx":"8b4d1b61bc2d","components/core/Container.jsx":"84e261a7ac3d","components/core/CredentialBadge.jsx":"5a1472a07912","components/core/Icon.jsx":"1ed443f817f9","components/core/SectionHeading.jsx":"796dfaf8b0cb","components/core/StarRating.jsx":"051e8a273722","components/footer/Footer.jsx":"642e9999e5b7","components/forms/Checkbox.jsx":"2703b721e984","components/forms/FormField.jsx":"07fbdcf74d2d","components/forms/Input.jsx":"80543c58a4c0","components/forms/Select.jsx":"385c9af0feb3","components/forms/Textarea.jsx":"31c24181d6cf","components/navigation/MobileMenu.jsx":"4b361cab9729","components/navigation/Navbar.jsx":"a733e46d737c","explorations/doc-page.js":"f52ae9c02fca","ui_kits/website/About.jsx":"245ac4757f30","ui_kits/website/App.jsx":"8149cda5cba2","ui_kits/website/Contact.jsx":"6871915cae8f","ui_kits/website/Home.jsx":"03f18e577b15","ui_kits/website/Layout.jsx":"434568c536a7","ui_kits/website/Research.jsx":"47bea9f6b5b3","ui_kits/website/ServicePage.jsx":"4d8b73d2d50c","ui_kits/website/data.js":"a5c7a98d5c4d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HorIZONPsychologyDesignSystem_bf71c7 = window.HorIZONPsychologyDesignSystem_bf71c7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Direction G, locked. Every number below was measured off the exploration once the word was
   centred in its viewBox, so the sun is exactly the first O's cell and the rule is exactly
   1.3 radii either side of it. The rule's bottom edge sits flush with the baseline (57.1 + 0.9).
   `ink` is the true ink extent of HORIZON — the text bbox minus the tracking that trails the final
   N — so the viewBox is the mark's real width and no visible ink falls outside the element box.
   A text bbox measured here still reads ~6.3 units wider than the box: that is the trailing
   advance after the N, empty space, not ink. Do not widen the viewBox to swallow it. */
const W = {
  word: 91.06,
  ink: 248.7,
  base: 58,
  sub: 88,
  sunCx: 150.09,
  sunCy: 50.05,
  sunR: 18.06,
  lineX1: 126.61,
  lineX2: 173.56,
  lineY: 57.1,
  subX: 118.33,
  subLen: 193.35
};
const SAGE = "#4f7264";
const AMBER = "#d9772e";
function Logo({
  variant = "full",
  sage = SAGE,
  amber = AMBER,
  mono,
  title = "Horizon Psychology",
  style,
  ...rest
}) {
  const uid = React.useId().replace(/:/g, "");
  const gid = `sunrise-${uid}`;
  const sun = mono ? mono : `url(#${gid})`;
  const word = mono || sage;
  const izon = mono || amber;
  const gradient = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: `crop-${uid}`
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "430",
    height: W.base
  })), mono ? null : /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#f5b25a"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.5",
    stopColor: "#e5872f"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#c15a1e"
  })));
  if (variant === "mark") {
    /* Square mark: the sun and its own horizon, no letters. Favicon, app icon, collapsed header. */
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 48 48",
      role: "img",
      "aria-label": title,
      style: {
        display: "block",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
      id: `mcrop-${uid}`
    }, /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "0",
      width: "48",
      height: "31.1"
    })), mono ? null : /*#__PURE__*/React.createElement("linearGradient", {
      id: gid,
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#f5b25a"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "0.5",
      stopColor: "#e5872f"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#c15a1e"
    }))), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "14",
      fill: sun,
      clipPath: `url(#mcrop-${uid})`
    }), /*#__PURE__*/React.createElement("rect", {
      x: "5.8",
      y: "31.1",
      width: "36.4",
      height: "1.9",
      fill: mono || sage
    }));
  }
  const showSub = variant === "full";
  const vb = showSub ? `${W.word} 24.88 ${W.ink} 63.12` : `${W.word} 24.88 ${W.ink} 34`;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: vb,
    role: "img",
    "aria-label": title,
    style: {
      display: "block",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("title", null, title), gradient, /*#__PURE__*/React.createElement("circle", {
    cx: W.sunCx,
    cy: W.sunCy,
    r: W.sunR,
    fill: sun,
    clipPath: `url(#crop-${uid})`
  }), /*#__PURE__*/React.createElement("rect", {
    x: W.lineX1,
    y: W.lineY - 0.9,
    width: W.lineX2 - W.lineX1,
    height: "1.8",
    fill: mono || sage
  }), /*#__PURE__*/React.createElement("text", {
    x: W.word,
    y: W.base,
    fontFamily: "Lora, serif",
    fontSize: "46",
    letterSpacing: "5.5"
  }, /*#__PURE__*/React.createElement("tspan", {
    fill: word
  }, "H"), /*#__PURE__*/React.createElement("tspan", {
    fill: "transparent"
  }, "O"), /*#__PURE__*/React.createElement("tspan", {
    fill: word
  }, "R"), /*#__PURE__*/React.createElement("tspan", {
    fill: izon
  }, "IZON")), showSub ? /*#__PURE__*/React.createElement("text", {
    x: W.subX,
    y: W.sub,
    textLength: W.subLen,
    lengthAdjust: "spacing",
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "12.5",
    fill: mono || "#5c6b64",
    letterSpacing: "4"
  }, "PSYCHOLOGY") : null);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/content/Faqs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toggle({
  open
}) {
  const bar = {
    position: "absolute",
    background: "var(--color-sage-600)",
    borderRadius: 1
  };
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "relative",
      display: "inline-block",
      width: 16,
      height: 16,
      flex: "0 0 auto",
      transform: open ? "rotate(135deg)" : "none",
      transition: "transform var(--duration-base) var(--ease-calm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      left: 0,
      top: 7.25,
      width: 16,
      height: 1.5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      top: 0,
      left: 7.25,
      width: 1.5,
      height: 16
    }
  }));
}
function FaqRow({
  item,
  index
}) {
  const [open, setOpen] = React.useState(false);
  const inner = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const measure = () => {
    if (inner.current) setHeight(inner.current.scrollHeight);
  };
  React.useEffect(() => {
    if (!inner.current) return;
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(inner.current);
    return () => {
      if (ro) ro.disconnect();
    };
  }, [item.answer]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: index ? "none" : "1px solid var(--color-line)",
      borderBottom: "1px solid var(--color-line)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-expanded": open,
    onClick: () => {
      measure();
      setOpen(o => !o);
    },
    style: {
      appearance: "none",
      display: "flex",
      width: "100%",
      alignItems: "baseline",
      gap: "clamp(16px, 3vw, 28px)",
      border: "none",
      background: "transparent",
      padding: "22px 0",
      color: "var(--color-text-heading)",
      cursor: "pointer",
      font: "inherit",
      fontFamily: "var(--font-display)",
      fontSize: "1.22rem",
      fontWeight: "var(--weight-regular)",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, item.question), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      height: "1.3em"
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    open: open
  }))), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      overflow: "hidden",
      maxHeight: open ? height : 0,
      transition: "max-height var(--duration-base) var(--ease-calm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: inner,
    style: {
      padding: "0 0 26px",
      maxWidth: "var(--measure-prose)",
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)"
    }
  }, String(item.answer).split("\n").map((para, j) => /*#__PURE__*/React.createElement("p", {
    key: j,
    style: {
      margin: j ? "0.9em 0 0" : 0
    }
  }, para)))));
}
function Faqs({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), items.map((item, i) => /*#__PURE__*/React.createElement(FaqRow, {
    key: item.question || i,
    item: item,
    index: i
  })));
}
Object.assign(__ds_scope, { Faqs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Faqs.jsx", error: String((e && e.message) || e) }); }

// components/content/PublicationItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PublicationItem({
  authors,
  year,
  title,
  journal,
  href,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("li", _extends({
    style: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 5,
      padding: "20px 0",
      borderBottom: "1px solid var(--color-line)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-text-muted)",
      fontSize: "var(--text-caption)"
    }
  }, authors, year ? ` · ${year}` : ""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-text-heading)",
      fontFamily: "var(--font-display)",
      fontSize: "1.05rem",
      lineHeight: 1.4
    }
  }, href ? /*#__PURE__*/React.createElement("a", {
    href: href
  }, title) : title), journal ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-text-muted)",
      fontSize: "var(--text-caption)",
      fontStyle: "italic"
    }
  }, journal) : null);
}
Object.assign(__ds_scope, { PublicationItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PublicationItem.jsx", error: String((e && e.message) || e) }); }

// components/content/Quote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Quote({
  children,
  attribution,
  align = "center",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      margin: 0,
      maxWidth: "var(--measure-prose)",
      marginInline: align === "center" ? "auto" : undefined,
      textAlign: align === "center" ? "center" : "start",
      alignItems: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0
    }
  }, children), attribution ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      color: "var(--color-text-muted)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, attribution) : null);
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Quote.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: "inline-flex",
  minHeight: 46,
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: "var(--radius-pill)",
  padding: "12px 26px",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-semibold)",
  lineHeight: 1.2,
  letterSpacing: "0.005em",
  textDecoration: "none",
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "var(--transition-quiet)"
};
const variants = {
  primary: {
    background: "var(--color-button-primary-surface)",
    color: "var(--color-button-primary-text)"
  },
  secondary: {
    background: "transparent",
    color: "var(--color-button-secondary-text)",
    borderColor: "var(--color-button-secondary-border)"
  },
  link: {
    minHeight: 0,
    background: "transparent",
    color: "var(--color-button-link-text)",
    padding: 0,
    border: "none",
    textDecoration: "underline",
    textDecorationColor: "var(--color-sage-300)",
    textUnderlineOffset: "0.18em"
  }
};
const hovers = {
  primary: {
    background: "var(--color-button-primary-surface-hover)"
  },
  secondary: {
    background: "var(--color-sage-50)",
    borderColor: "var(--color-sage-600)"
  },
  link: {
    color: "var(--color-accent-strong)",
    textDecorationColor: "var(--color-accent-strong)"
  }
};
function Button({
  label,
  href,
  type = "primary",
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[type],
      ...(hover ? hovers[type] : null),
      ...style
    }
  }, rest), label ?? children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Callout({
  title,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      background: "var(--color-note-surface)",
      border: "1px solid var(--color-note-border)",
      borderRadius: "var(--radius-card)",
      padding: "var(--card-pad)",
      color: "var(--color-note-text)",
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      marginBottom: 8,
      fontSize: "var(--text-eyebrow)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-small)",
      lineHeight: 1.6
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/Container.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Container({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: "100%",
      maxWidth: "calc(var(--content-max-width) + var(--gutter) * 2)",
      marginInline: "auto",
      paddingInline: "var(--gutter)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Container });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Container.jsx", error: String((e && e.message) || e) }); }

// components/core/CredentialBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CredentialBadge({
  label,
  tooltip,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": tooltip,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--color-sage-100)",
      background: "var(--color-sage-50)",
      padding: "7px 15px",
      font: "inherit",
      color: "var(--color-sage-800)",
      fontSize: "var(--text-caption)",
      fontWeight: "var(--weight-medium)",
      lineHeight: 1.3,
      cursor: "default"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      bottom: "calc(100% + 10px)",
      left: "50%",
      zIndex: 10,
      width: "max-content",
      maxWidth: 240,
      transform: `translateX(-50%) translateY(${open ? 0 : 4}px)`,
      transition: "opacity var(--duration-fast) var(--ease-calm), transform var(--duration-fast) var(--ease-calm)",
      borderRadius: "var(--radius-sm)",
      background: "var(--color-sage-800)",
      padding: "9px 13px",
      color: "#fff",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-caption)",
      lineHeight: 1.4,
      textAlign: "center",
      opacity: open ? 1 : 0,
      pointerEvents: "none",
      boxShadow: "var(--shadow-raised)"
    }
  }, tooltip));
}
Object.assign(__ds_scope, { CredentialBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CredentialBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Icons ship as SVG files in assets/icons. They are masked so they inherit currentColor. */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  base = "/assets/icons",
  style,
  ...rest
}) {
  const url = `${base}/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      background: color,
      WebkitMask: `url("${url}") center/contain no-repeat`,
      mask: `url("${url}") center/contain no-repeat`,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ServiceCard({
  title,
  description,
  href,
  icon,
  iconBase,
  cta = "Read more",
  meta,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      background: "var(--surface-card)",
      border: `1px solid ${hover ? "var(--color-sage-300)" : "var(--color-line)"}`,
      borderRadius: "var(--radius-card)",
      padding: "var(--card-pad)",
      boxShadow: hover ? "var(--shadow-raised)" : "var(--shadow-rest)",
      transform: hover ? "translateY(-3px)" : "none",
      transition: "var(--transition-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "grid",
      width: 52,
      height: 52,
      placeItems: "center",
      borderRadius: "var(--radius-pill)",
      background: "var(--color-icon-surface)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 26,
    color: "var(--color-icon-mark)",
    base: iconBase
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      flex: 1,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)",
      lineHeight: 1.6
    }
  }, description), meta ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-sand-800)",
      fontSize: "var(--text-caption)"
    }
  }, meta) : null, /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      color: "var(--color-button-link-text)",
      fontSize: "var(--text-small)",
      fontWeight: "var(--weight-semibold)",
      textDecoration: "none"
    }
  }, cta, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      marginLeft: 6,
      transform: hover ? "translateX(3px)" : "none",
      transition: "transform var(--duration-base) var(--ease-calm)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0
    }
  })));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  title,
  lead,
  leadMaxWidth,
  align = "start",
  as = "h2",
  style,
  ...rest
}) {
  const H = as;
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      textAlign: align === "center" ? "center" : "start",
      alignItems: align === "center" ? "center" : "stretch",
      maxWidth: align === "center" ? "var(--measure-prose)" : undefined,
      marginInline: align === "center" ? "auto" : undefined,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-eyebrow)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement(H, {
    style: {
      margin: 0
    }
  }, title), lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: leadMaxWidth || "var(--measure-prose)",
      color: "var(--color-text-muted)",
      fontSize: "var(--text-lead)",
      lineHeight: 1.6
    }
  }, lead) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/StarRating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StarRating({
  count = 5,
  iconBase,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "img",
    "aria-label": `${count} out of ${count} stars`,
    style: {
      display: "flex",
      gap: 5,
      ...style
    }
  }, rest), Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: i,
    name: "star",
    size: 17,
    color: "var(--color-sand-600)",
    base: iconBase
  })));
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StarRating.jsx", error: String((e && e.message) || e) }); }

// components/content/TestimonialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TestimonialCard({
  quote,
  name,
  iconBase,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      margin: 0,
      background: "var(--surface-quiet)",
      borderRadius: "var(--radius-panel)",
      padding: "var(--panel-pad)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontSize: "var(--text-quote-card)"
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StarRating, {
    iconBase: iconBase
  }), name));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/content/TestimonialCarousel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* One quote at a time. Every slide stays mounted in the same grid cell, so the panel is as tall as
   the longest quote and never jumps as it advances. Arrows flank the panel; dots sit underneath. */
function TestimonialCarousel({
  items = [],
  iconBase,
  interval = 7000,
  style,
  ...rest
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [hovered, setHovered] = React.useState(null);
  const prev = React.useRef(0);
  const count = items.length;
  const go = React.useCallback(n => setIndex(i => {
    prev.current = i;
    return (n % count + count) % count;
  }), [count]);
  const reduced = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  React.useEffect(() => {
    if (!interval || paused || count < 2 || reduced) return;
    const t = setTimeout(() => go(index + 1), interval);
    return () => clearTimeout(t);
  }, [index, interval, paused, count, reduced, go]);
  if (!count) return null;
  const arrow = dir => ({
    display: "inline-flex",
    width: 44,
    height: 44,
    flex: "0 0 auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    border: 0,
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    color: hovered === dir ? "var(--color-sage-800)" : "var(--color-sage-300)",
    transition: "color var(--duration-base) var(--ease-calm)"
  });
  const chevron = dir => ({
    transform: dir === "prev" ? "rotate(180deg)" : "none"
  });
  const slide = i => {
    if (reduced) return {
      opacity: i === index ? 1 : 0
    };
    const offset = i === index ? "0px" : i === prev.current ? "-32px" : "32px";
    return {
      opacity: i === index ? 1 : 0,
      transform: `translateX(${offset})`
    };
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => {
      setPaused(false);
      setHovered(null);
    },
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: "clamp(6px, 2vw, 20px)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Previous testimonial",
    onClick: () => go(index - 1),
    onMouseEnter: () => setHovered("prev"),
    onMouseLeave: () => setHovered(null),
    style: arrow("prev")
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow",
    size: 22,
    base: iconBase,
    style: chevron("prev")
  })), /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      display: "grid",
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      paddingBlock: "clamp(8px, 2vw, 20px)"
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("figure", {
    key: item.name,
    "aria-hidden": i !== index,
    inert: i !== index ? "" : undefined,
    style: {
      gridArea: "1 / 1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      margin: 0,
      textAlign: "center",
      pointerEvents: i === index ? "auto" : "none",
      ...slide(i),
      transition: "opacity 380ms var(--ease-calm), transform 380ms var(--ease-calm)"
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontSize: "var(--text-quote)"
    }
  }, "\u201C", item.quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StarRating, {
    iconBase: iconBase
  }), item.name)))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Next testimonial",
    onClick: () => go(index + 1),
    onMouseEnter: () => setHovered("next"),
    onMouseLeave: () => setHovered(null),
    style: arrow("next")
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow",
    size: 22,
    base: iconBase,
    style: chevron("next")
  }))), /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    "aria-label": "Testimonials",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("button", {
    key: item.name,
    type: "button",
    role: "tab",
    "aria-selected": i === index,
    "aria-label": `Testimonial ${i + 1} of ${count}`,
    onClick: () => go(i),
    style: {
      display: "grid",
      width: 22,
      height: 22,
      placeItems: "center",
      border: 0,
      background: "transparent",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 9,
      height: 9,
      borderRadius: "var(--radius-pill)",
      background: i === index ? "var(--color-sage-800)" : "var(--color-sage-300)",
      transition: "background var(--duration-base) var(--ease-calm)"
    }
  })))));
}
Object.assign(__ds_scope, { TestimonialCarousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TestimonialCarousel.jsx", error: String((e && e.message) || e) }); }

// components/footer/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Footer({
  groups = [],
  brandName = "Horizon Psychology",
  note,
  email,
  onNavigate,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.getBoundingClientRect().width);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const stacked = width !== null && width < 560;
  const twoUp = width !== null && width >= 560 && width < 900;
  const columns = stacked ? "minmax(0, 1fr)" : twoUp ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1.4fr) repeat(auto-fit, minmax(140px, 1fr))";
  const shell = {
    width: "100%",
    maxWidth: "calc(var(--content-max-width) + var(--gutter) * 2)",
    marginInline: "auto",
    paddingInline: "var(--gutter)"
  };
  const go = (e, link) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(link);
    }
  };
  return /*#__PURE__*/React.createElement("footer", _extends({
    ref: ref,
    style: {
      borderTop: "1px solid var(--color-line)",
      background: "var(--surface-quiet)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      paddingBlock: "clamp(36px, 5vw, 64px) 28px",
      display: "grid",
      gridTemplateColumns: columns,
      gap: stacked ? "32px" : "36px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      maxWidth: "34ch",
      gridColumn: twoUp ? "1 / -1" : "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "wordmark",
    title: brandName,
    style: {
      height: 22,
      width: "auto",
      alignSelf: "flex-start"
    }
  }), note ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)"
    }
  }, note) : null, email ? /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      fontSize: "var(--text-small)",
      wordBreak: "break-word"
    }
  }, email) : null), groups.map(group => /*#__PURE__*/React.createElement("nav", {
    key: group.title,
    "aria-label": group.title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-eyebrow)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, group.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: stacked ? 12 : 9,
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  }, group.links.map(link => /*#__PURE__*/React.createElement("li", {
    key: link.label
  }, /*#__PURE__*/React.createElement("a", {
    href: link.href || "#",
    onClick: e => go(e, link),
    style: {
      display: "inline-block",
      minHeight: stacked ? 24 : "auto",
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)",
      textDecoration: "none"
    }
  }, link.label))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      paddingBottom: 32
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-ink-faint)",
      fontSize: "var(--text-caption)",
      maxWidth: "70ch"
    }
  }, "Dr Emma Izon is registered with the Health and Care Professions Council and accredited by the BABCP. Therapy is not an emergency service \u2014 if you need support today, contact your GP or call NHS 111.")));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/footer/Footer.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  id,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)",
      lineHeight: 1.55,
      cursor: "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: "checkbox",
    style: {
      width: 18,
      height: 18,
      marginTop: 2,
      flex: "0 0 auto",
      accentColor: "var(--color-accent)"
    }
  }, rest)), /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function FormField({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      color: "var(--color-text-heading)",
      fontSize: "var(--text-small)",
      fontWeight: "var(--weight-semibold)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-sand-600)"
    }
  }, " *") : null), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-text-muted)",
      fontSize: "var(--text-caption)"
    }
  }, hint) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-error)",
      fontSize: "var(--text-caption)"
    }
  }, error) : null);
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  invalid = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    style: {
      ...{
        width: "100%",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body)",
        lineHeight: 1.5,
        color: "var(--color-text-body)",
        background: "var(--color-field-surface)",
        border: "1px solid var(--color-field-border)",
        borderRadius: "var(--radius-sm)",
        padding: "12px 15px",
        transition: "var(--transition-quiet)"
      },
      borderColor: invalid ? "var(--color-error)" : "var(--color-field-border)",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  options = [],
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("select", _extends({
    style: {
      ...{
        width: "100%",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body)",
        lineHeight: 1.5,
        color: "var(--color-text-body)",
        background: "var(--color-field-surface)",
        border: "1px solid var(--color-field-border)",
        borderRadius: "var(--radius-sm)",
        padding: "12px 15px",
        transition: "var(--transition-quiet)"
      },
      appearance: "none",
      paddingRight: 40,
      backgroundImage: "linear-gradient(45deg, transparent 50%, var(--color-sage-600) 50%), linear-gradient(135deg, var(--color-sage-600) 50%, transparent 50%)",
      backgroundPosition: "calc(100% - 21px) calc(50% + 2px), calc(100% - 15px) calc(50% + 2px)",
      backgroundSize: "6px 6px, 6px 6px",
      backgroundRepeat: "no-repeat",
      ...style
    }
  }, rest), children || options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value || o,
    value: o.value || o
  }, o.label || o)));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  rows = 5,
  invalid = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    style: {
      ...{
        width: "100%",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body)",
        lineHeight: 1.5,
        color: "var(--color-text-body)",
        background: "var(--color-field-surface)",
        border: "1px solid var(--color-field-border)",
        borderRadius: "var(--radius-sm)",
        padding: "12px 15px",
        transition: "var(--transition-quiet)"
      },
      resize: "vertical",
      borderColor: invalid ? "var(--color-error)" : "var(--color-field-border)",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MobileMenu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MobileMenu({
  items = [],
  brandName = "Horizon Psychology",
  onNavigate,
  onClose,
  iconBase,
  style,
  ...rest
}) {
  const go = (e, item) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item);
    }
    if (onClose) onClose();
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Menu",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-page)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minHeight: 66,
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      borderBottom: "1px solid var(--color-line)",
      paddingInline: "var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    onClick: e => go(e, {
      id: "home",
      label: "Home"
    }),
    "aria-label": `${brandName}, home`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "wordmark",
    title: brandName,
    style: {
      height: 20,
      width: "auto"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close menu",
    onClick: onClose,
    style: {
      display: "inline-flex",
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      border: 0,
      background: "transparent",
      color: "var(--color-sage-800)",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 24,
    base: iconBase
  }))), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Menu",
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "4px var(--gutter) 8px"
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  }, items.map(item => /*#__PURE__*/React.createElement("li", {
    key: item.label,
    style: {
      borderBottom: "1px solid var(--color-line)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href || "#",
    onClick: e => go(e, item),
    style: {
      display: "block",
      padding: "18px 0",
      color: "var(--color-text-heading)",
      fontFamily: "var(--font-display)",
      fontSize: "1.5rem",
      textDecoration: "none"
    }
  }, item.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    href: "/contact/",
    label: "Contact Us",
    style: {
      display: "none"
    },
    onClick: e => go(e, {
      id: "contact",
      label: "Contact"
    })
  }))));
}
Object.assign(__ds_scope, { MobileMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MobileMenu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The header always shows the logo itself, never a mark paired with the name in type. The tall
   home variant shows the full lockup; every other state shows the wordmark, PSYCHOLOGY dropped. */
const LOCKUP_RATIO = 248.7 / 63.12;
/* A nav item with children opens a hover/focus dropdown. Click toggles it too, for touch-capable laptops. */
function NavDropdown({ item, go, iconBase }) {
  const [open, setOpen] = React.useState(false);
  const [hi, setHi] = React.useState(-1);
  const timer = React.useRef(null);
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => { setOpen(false); setHi(-1); }, 140); };
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return React.createElement("div", {
    onMouseEnter: show, onMouseLeave: hide, onFocus: show,
    onBlur: e => { if (!e.currentTarget.contains(e.relatedTarget)) hide(); },
    onKeyDown: e => { if (e.key === "Escape") { setOpen(false); e.currentTarget.querySelector("button").focus(); } },
    style: { position: "relative", display: "flex", alignItems: "center" }
  }, React.createElement("button", {
    type: "button", "aria-expanded": open, "aria-haspopup": "true",
    onClick: () => setOpen(o => !o),
    style: { display: "inline-flex", alignItems: "center", gap: 6, border: 0, background: "transparent", padding: "10px 0", cursor: "pointer",
      color: open ? "var(--color-sage-800)" : "var(--color-text-muted)", fontFamily: "inherit", fontSize: "var(--text-small)", fontWeight: "var(--weight-medium)", whiteSpace: "nowrap" }
  }, item.label, React.createElement(__ds_scope.Icon, { name: "arrow", size: 14, base: iconBase,
    style: { transform: open ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform var(--duration-base, 220ms) var(--ease-standard, ease)" } })),
  React.createElement("div", {
    style: { position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: 10, zIndex: 16,
      opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden", transition: "opacity 180ms var(--ease-standard, ease), visibility 180ms" }
  }, React.createElement("ul", {
    style: { margin: 0, padding: 8, listStyle: "none", minWidth: 240, background: "var(--surface-card, #fff)", border: "1px solid var(--color-line)",
      borderRadius: "var(--radius-card, 16px)", boxShadow: "var(--shadow-raised)" }
  }, item.children.map((c, i) => React.createElement("li", { key: c.label }, React.createElement("a", {
    href: c.href || "#", tabIndex: open ? 0 : -1,
    onClick: e => { setOpen(false); go(e, c); },
    onMouseEnter: () => setHi(i), onMouseLeave: () => setHi(-1),
    style: { display: "block", padding: "10px 14px", borderRadius: "var(--radius-field, 8px)", textDecoration: "none", whiteSpace: "nowrap",
      fontSize: "var(--text-small)", fontWeight: "var(--weight-medium)",
      color: hi === i ? "var(--color-sage-800)" : "var(--color-text-body)",
      background: hi === i ? "var(--color-sage-50)" : "transparent", transition: "background 160ms, color 160ms" }
  }, c.label))))));
}
function Navbar({
  brandName = "Horizon Psychology",
  wideLogo,
  items = [],
  onNavigate,
  iconBase,
  compact,
  style,
  ...rest
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.getBoundingClientRect().width);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const isCompact = compact !== undefined ? compact : width === null ? false : width < 880;
  const showCta = width === null || width >= 460;

  /* wideLogo opens the header at three times its normal height with the full lockup, and collapses
     to the wordmark over the first 150px of scroll. Only that page behaves this way. */
  const [t, setT] = React.useState(wideLogo ? 0 : 1);
  React.useEffect(() => {
    if (!wideLogo) {
      setT(1);
      return;
    }
    const on = () => setT(Math.min(1, (window.scrollY || 0) / 150));
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, [wideLogo]);
  const baseH = isCompact ? 66 : 76;
  const tallH = isCompact ? 130 : 176;
  const wordH = isCompact ? 20 : 24;
  const maxWideH = isCompact ? 52 : 78;
  const barH = wideLogo ? tallH - (tallH - baseH) * t : baseH;
  const wideH = Math.max(wordH, maxWideH - (maxWideH - wordH) * t);
  const wideOpacity = wideLogo ? Math.max(0, Math.min(1, 1 - t / 0.45)) : 0;
  const wordOpacity = wideLogo ? Math.max(0, Math.min(1, (t - 0.3) / 0.4)) : 1;
  const stacking = wideLogo && wideOpacity > 0; // only overlap the two lockups while cross-fading
  /* While tall the header carries no surface of its own — the page wash runs up to the top edge and
     the logo floats on it. Paper, blur and the hairline fade in as the bar collapses. */
  const chrome = wideLogo ? Math.max(0, Math.min(1, (t - 0.15) / 0.55)) : 1;
  const go = (e, item) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item);
      setMenuOpen(false);
    }
  };
  React.useEffect(() => {
    if (!isCompact) setMenuOpen(false);
  }, [isCompact]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", _extends({
    ref: ref,
    style: {
      position: "sticky",
      top: 0,
      zIndex: 15,
      width: "100%",
      background: `color-mix(in srgb, var(--surface-page) ${Math.round(88 * chrome)}%, transparent)`,
      backdropFilter: chrome > 0.05 ? `blur(${(8 * chrome).toFixed(1)}px)` : "none",
      borderBottom: `1px solid color-mix(in srgb, var(--color-line) ${Math.round(100 * chrome)}%, transparent)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "100%",
      maxWidth: "calc(var(--content-max-width) + var(--gutter) * 2)",
      minHeight: barH,
      marginInline: "auto",
      alignItems: "center",
      gap: wideLogo ? "clamp(14px, 2vw, 32px)" : "clamp(14px, 3vw, 40px)",
      paddingInline: "var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    onClick: e => go(e, {
      id: "home",
      label: "Home"
    }),
    "aria-label": `${brandName}, home`,
    style: stacking ? {
      position: "relative",
      flex: "0 0 auto",
      height: Math.max(wordH, wideH),
      width: `min(${Math.round(wideH * LOCKUP_RATIO)}px, 46vw)`,
      textDecoration: "none"
    } : {
      display: "inline-flex",
      flex: "0 0 auto",
      alignItems: "center",
      textDecoration: "none"
    }
  }, stacking ? /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    title: brandName,
    style: {
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      height: wideH,
      width: "auto",
      maxWidth: "100%",
      opacity: wideOpacity
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      ...(stacking ? {
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        opacity: wordOpacity,
        pointerEvents: wordOpacity > 0 ? "auto" : "none"
      } : null),
      display: "inline-flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "wordmark",
    title: brandName,
    style: {
      height: wordH,
      width: "auto"
    }
  }))), !isCompact ? /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
      display: "flex",
      flex: 1,
      minWidth: 0,
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "clamp(14px, 2vw, 32px)"
    }
  }, items.map(item => item.children ? /*#__PURE__*/React.createElement(NavDropdown, {
    key: item.label,
    item: item,
    go: go,
    iconBase: iconBase
  }) : /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: item.href || "#",
    onClick: e => go(e, item),
    style: {
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)",
      fontWeight: "var(--weight-medium)",
      textDecoration: "none",
      whiteSpace: "nowrap"
    }
  }, item.label))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: isCompact ? 1 : "0 0 auto",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: isCompact ? 6 : 14
    }
  }, showCta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    href: "/contact/",
    label: "Contact Us",
    style: {
      flex: "0 0 auto",
      minHeight: 44,
      padding: isCompact ? "10px 16px" : "10px 20px",
      fontSize: "var(--text-small)",
      whiteSpace: "nowrap"
    },
    onClick: e => go(e, {
      id: "contact",
      label: "Contact"
    })
  }) : null, isCompact ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": menuOpen ? "Close menu" : "Open menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(o => !o),
    style: {
      display: "inline-flex",
      width: 44,
      height: 44,
      flex: "0 0 auto",
      alignItems: "center",
      justifyContent: "center",
      border: 0,
      background: "transparent",
      color: "var(--color-sage-800)",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "burger",
    size: 24,
    base: iconBase
  })) : null))), isCompact && menuOpen ? /*#__PURE__*/React.createElement(__ds_scope.MobileMenu, {
    items: items,
    iconBase: iconBase,
    brandName: brandName,
    onNavigate: onNavigate,
    onClose: () => setMenuOpen(false)
  }) : null);
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// explorations/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    /* Monolithic at print: Blink slices a transform-scaled child at
     * fragmentainer boundaries mapped in UNSCALED layout coordinates
     * (transforms are paint-time), so the .fit box (authored size, e.g.
     * 1400x990) gets cut at the page's free block space and spills onto
     * a second sheet even though its SCALED footprint fits the page by
     * construction. overflow:hidden makes .fit-box a scroll container —
     * monolithic under fragmentation (css-break-3) — so the scaled
     * content prints atomically on one sheet. No clipping for content
     * within the authored box: .fit-box is calc-sized to exactly the
     * scaled footprint. (Content that bleeds past content-width/height
     * is clipped at the footprint — fit mode's contract; it previously
     * painted beyond it at print.) Print-only, so the screen rendering
     * keeps visible overflow for editor affordances.
     * The export path injects the same rule into frozen copies
     * (print-eval.ts om-print-fit-contain). The .fit-mode scope is
     * load-bearing: .fit-box wraps slotted content in EVERY mode, and an
     * unscoped overflow:hidden would make whole flowing documents
     * monolithic (one truncated sheet). overflow:hidden, never clip —
     * clip is not a scroll container, so not monolithic. */
    @media print {
      .fit-mode .fit-box { overflow: hidden; }
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  SectionHeading,
  Quote,
  CredentialBadge,
  Container
} = window.HorIZONPsychologyDesignSystem_bf71c7;
function About({
  go
}) {
  const S = window.SITE;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    first: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.7fr)",
      gap: "clamp(32px, 5vw, 64px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: "var(--measure-prose)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "About Emma",
    as: "h1",
    title: "Dr Emma Izon",
    lead: "Clinical Psychologist \xB7 PhD, DClinPsych, MSc, BSc"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Dr Emma Izon is a Clinical Psychologist, Cognitive Behavioural Psychotherapist, and researcher who offers psychological therapy, as well as clinical and research supervision. Trained at the University of Oxford, she specialises in evidence-based, compassionate care, with particular expertise in psychosis, bipolar disorder, trauma-informed practice, and neurodiversity-affirming therapy."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "She works collaboratively with people from all walks of life, helping them understand their experiences, make sense of difficult emotions, and develop meaningful, lasting change."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, S.credentials.map(c => /*#__PURE__*/React.createElement(CredentialBadge, _extends({
    key: c.label
  }, c))))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/emma-portrait.png",
    alt: "Dr Emma Izon",
    style: {
      width: "100%",
      aspectRatio: "4 / 5",
      objectFit: "cover",
      borderRadius: "var(--radius-panel)",
      boxShadow: "var(--shadow-rest)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-quiet)"
    }
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Quote, null, "\u201CA safe and supportive space to reflect, grow, and make sense of your experiences, at a pace that feels right for you\u201D"))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
      gap: "clamp(32px, 5vw, 72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Therapeutic approach",
    title: "How Emma works"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      maxWidth: "var(--measure-prose)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Emma believes that therapy is most effective when it is built on a safe, trusting, and collaborative relationship. She offers a calm, confidential space where clients can explore their experiences at a pace that feels right for them, without judgement or pressure."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Our work is grounded in evidence-based psychological practice and integrates Cognitive Behavioural Therapy (CBT), Acceptance and Commitment Therapy (ACT), and Compassion-Focused Therapy (CFT), tailoring therapy to each individual's needs, strengths, and goals. Committed to trauma-informed, neurodiversity-affirming, and culturally sensitive practice, we help clients build resilience, deepen self-understanding, and create meaningful, sustainable change."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    href: "/contact/",
    label: "Book a free 15-minute call",
    onClick: e => {
      e.preventDefault();
      go("contact");
    }
  }))))));
}
Object.assign(window, {
  About
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
function App() {
  const [page, setPage] = React.useState("home");
  const [compact, setCompact] = React.useState(false);
  const go = id => {
    setPage(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const serviceIds = window.SITE.services.map(s => s.id);
  const content = serviceIds.includes(page) ? /*#__PURE__*/React.createElement(window.ServicePage, {
    id: page,
    go: go
  }) : React.createElement({
    home: window.Home,
    about: window.About,
    research: window.Research,
    contact: window.Contact
  }[page] || window.Home, {
    go
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SiteHeader, {
    go: go,
    compact: compact,
    wide: page === "home"
  }), /*#__PURE__*/React.createElement("main", null, content), /*#__PURE__*/React.createElement(SiteFooter, {
    go: go
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCompact(c => !c),
    title: "Preview the mobile navigation",
    style: {
      position: "fixed",
      right: 16,
      bottom: 16,
      zIndex: 30,
      border: "1px solid var(--color-line)",
      background: "var(--color-panel)",
      color: "var(--color-text-muted)",
      borderRadius: 999,
      padding: "9px 15px",
      fontSize: 12,
      fontFamily: "var(--font-body)",
      boxShadow: "var(--shadow-raised)",
      cursor: "pointer"
    }
  }, compact ? "Desktop nav" : "Mobile nav"));
}
const rootEl = document.getElementById("root");
if (rootEl) ReactDOM.createRoot(rootEl).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
const {
  Button,
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  Callout,
  SectionHeading,
  Container
} = window.HorIZONPsychologyDesignSystem_bf71c7;
function Contact() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement(Section, {
    first: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
      gap: "clamp(32px, 5vw, 64px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Get in touch",
    as: "h1",
    title: "Book a free 15-minute call",
    lead: "A short, no-obligation conversation: ask questions, say what matters to you, and see whether working together feels right."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      background: "var(--surface-sage)",
      borderRadius: "var(--radius-panel)",
      padding: "var(--panel-pad)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-small)"
    }
  }, "You will hear back by email within 5 working days."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@horizonpsychology.co.uk",
    style: {
      fontSize: "var(--text-small)"
    }
  }, "hello@horizonpsychology.co.uk"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)"
    }
  }, "Sessions are available online, delivered securely by video call, or face-to-face in Buckinghamshire.")), /*#__PURE__*/React.createElement(Callout, {
    title: "If you need help now"
  }, "Therapy is not an emergency service. If you need support today, contact your GP, call NHS 111, or call the Samaritans free on 116 123.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--color-line)",
      borderRadius: "var(--radius-panel)",
      padding: "var(--panel-pad)",
      boxShadow: "var(--shadow-rest)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h2", null, "Thank you \u2014 your message has been sent"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-text-muted)"
    }
  }, "You will hear back by email within 5 working days."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    label: "Send another message",
    type: "secondary",
    onClick: () => setSent(false)
  }))) : /*#__PURE__*/React.createElement("form", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    },
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Your name",
    htmlFor: "name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    id: "name",
    placeholder: "First name is fine",
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Email",
    htmlFor: "email",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    placeholder: "you@example.com",
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "What are you enquiring about?",
    htmlFor: "topic"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "topic",
    options: window.SITE.services.map(s => s.title).concat("Something else")
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Online or face-to-face?",
    htmlFor: "format"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "format",
    options: ["Online", "Face-to-face in Buckinghamshire", "Not sure yet"]
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Anything you would like me to know?",
    htmlFor: "msg",
    hint: "Only as much as you feel comfortable sharing."
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "msg",
    rows: 5
  })), /*#__PURE__*/React.createElement(Checkbox, {
    id: "consent",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "I have read the ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault()
    }, "privacy notice"), ".")
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    label: "Send enquiry"
  }))))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  ServiceCard,
  CredentialBadge,
  SectionHeading,
  Quote,
  TestimonialCarousel,
  Faqs,
  Container
} = window.HorIZONPsychologyDesignSystem_bf71c7;
function Hero({
  go
}) {
  const S = window.SITE;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBlock: "clamp(20px, 2.6vw, 40px) clamp(56px, 7vw, 96px)"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
      gap: "clamp(32px, 5vw, 72px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 26,
      maxWidth: "46ch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-eyebrow)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: 600,
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, "Dr Emma Izon \xB7 Clinical Psychologist"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-hero)"
    }
  }, "A space for support, understanding, and change"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-lead)",
      lineHeight: 1.6
    }
  }, "Psychological therapy and supervision for adults, online or face-to-face in Buckinghamshire. Helping you move through difficult times, one step at a time."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    href: "/contact/",
    label: "Book a free 15-minute call",
    onClick: e => {
      e.preventDefault();
      go("contact");
    }
  }), /*#__PURE__*/React.createElement(Button, {
    href: "/about/",
    label: "More about Emma",
    type: "secondary",
    onClick: e => {
      e.preventDefault();
      go("about");
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 2
    }
  }, S.credentials.map(c => /*#__PURE__*/React.createElement(CredentialBadge, _extends({
    key: c.label
  }, c))))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/hands-connecting.png",
    alt: "",
    style: {
      width: "100%",
      aspectRatio: "4 / 5",
      objectFit: "cover",
      borderRadius: "var(--radius-panel)",
      boxShadow: "var(--shadow-rest)"
    }
  }))));
}
function Home({
  go
}) {
  const S = window.SITE;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
      gap: "clamp(32px, 5vw, 72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "About Emma",
    title: "Evidence-based therapy, delivered with warmth"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      maxWidth: "var(--measure-prose)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-lead)",
      lineHeight: 1.6
    }
  }, S.homeIntro), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    href: "/about/",
    label: "More about Emma",
    type: "link",
    onClick: e => {
      e.preventDefault();
      go("about");
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-quiet)"
    }
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Quote, null, "\u201C", S.heroQuote, "\u201D"))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Services",
    title: "Four ways of working together",
    lead: "Every service begins with a free 15-minute call, so you can ask questions and decide whether it feels right."
  }), /*#__PURE__*/React.createElement("div", {
    className: "svc-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: 20,
      marginTop: 40
    }
  }, S.services.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.id,
    iconBase: ICONS,
    icon: s.icon,
    title: s.title,
    meta: s.meta,
    description: s.summary,
    href: s.href,
    onClick: e => {
      e.preventDefault();
      go(s.id);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-sage)"
    }
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Client experience",
    title: "What people have said"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      maxWidth: "var(--measure-feature)",
      marginInline: "auto"
    }
  }, /*#__PURE__*/React.createElement(TestimonialCarousel, {
    items: S.testimonials,
    iconBase: ICONS
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    href: "/testimonials/",
    label: "Read more feedback",
    type: "link",
    onClick: e => e.preventDefault()
  })))), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
      gap: "clamp(32px, 5vw, 72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Before you get in touch",
    title: "Common questions"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Faqs, {
    items: S.faqs.slice(0, 4)
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-small)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/faqs/",
    onClick: e => e.preventDefault()
  }, "All frequently asked questions"))))));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Layout.jsx
try { (() => {
const {
  Navbar,
  Footer,
  Container
} = window.HorIZONPsychologyDesignSystem_bf71c7;
const ICONS = "../../assets/icons";
const BRAND = "Horizon Psychology";
function SiteHeader({
  go,
  compact,
  wide
}) {
  return /*#__PURE__*/React.createElement(Navbar, {
    brandName: BRAND,
    items: window.SITE.nav,
    wideLogo: wide,
    iconBase: ICONS,
    compact: compact,
    onNavigate: item => go(item.id || "home")
  });
}
function SiteFooter({
  go
}) {
  return /*#__PURE__*/React.createElement(Footer, {
    brandName: BRAND,
    email: "hello@horizonpsychology.co.uk",
    groups: window.SITE.footerGroups,
    note: "Psychological therapy, clinical and research supervision. Online, and face-to-face in Buckinghamshire.",
    onNavigate: l => go(l.id || "home")
  });
}

/* first: the section directly under the header opens tighter, so the page starts close to the nav */
function Section({
  children,
  style,
  first
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBlock: first ? "clamp(44px, 5vw, 76px) var(--section-y)" : "var(--section-y)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Container, null, children));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  Section,
  ICONS,
  BRAND
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Layout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Research.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  PublicationItem,
  SectionHeading,
  Container
} = window.HorIZONPsychologyDesignSystem_bf71c7;
function Research() {
  const S = window.SITE;
  return /*#__PURE__*/React.createElement(Section, {
    first: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
      gap: "clamp(32px, 5vw, 72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Research",
    as: "h1",
    title: "Published work",
    lead: "Dr Izon publishes in peer-reviewed journals and brings that evidence directly into clinical practice."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)"
    }
  }, "Areas of research: at-risk mental states and psychosis, expressed emotion, family and sibling experience, and service-user measures."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-small)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.researchgate.net/profile/Emma-Izon"
  }, "ResearchGate"), " · ", /*#__PURE__*/React.createElement("a", {
    href: "https://manchester.academia.edu/EmmaIzon"
  }, "Academia.edu"))), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      borderTop: "1px solid var(--color-line)"
    }
  }, S.publications.map(p => /*#__PURE__*/React.createElement(PublicationItem, _extends({
    key: p.title
  }, p))))));
}
Object.assign(window, {
  Research
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Research.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServicePage.jsx
try { (() => {
const {
  Button,
  Faqs,
  SectionHeading,
  Container
} = window.HorIZONPsychologyDesignSystem_bf71c7;
function ServicePage({
  id,
  go
}) {
  const S = window.SITE;
  const service = S.services.find(s => s.id === id) || S.services[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    first: true,
    style: {
      paddingBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 0.75fr)",
      gap: "clamp(32px, 4vw, 56px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: "var(--measure-prose)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: service.eyebrow,
    as: "h1",
    title: service.title,
    lead: service.summary
  }), service.paragraphs.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: 0
    }
  }, p))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22,
      background: "var(--surface-sage)",
      borderRadius: "var(--radius-panel)",
      padding: "var(--panel-pad)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-eyebrow)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: 600,
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase"
    }
  }, "Fees and practicalities"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      color: "var(--color-text-heading)",
      fontFamily: "var(--font-display)",
      fontSize: "1.6rem"
    }
  }, service.fee), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)"
    }
  }, service.duration)), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      margin: 0,
      padding: 0,
      listStyle: "none",
      color: "var(--color-text-muted)",
      fontSize: "var(--text-small)"
    }
  }, service.practical.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--color-sage-600)"
    }
  }, "\u2014"), p))), /*#__PURE__*/React.createElement(Button, {
    href: "/contact/",
    label: "Book a free call",
    onClick: e => {
      e.preventDefault();
      go("contact");
    }
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
      gap: "clamp(32px, 5vw, 72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Questions",
    title: "Before you get in touch"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Faqs, {
    items: S.faqs.slice(0, 4)
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-small)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/faqs/",
    onClick: e => e.preventDefault()
  }, "All frequently asked questions"))))));
}
Object.assign(window, {
  ServicePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServicePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
/* Copy is Dr Izon's, taken from the live site and the brief, restructured for the proposed
   information architecture. Fees, formats and clinical wording are unchanged. */
window.SITE = {
  heroQuote: "A space for support, understanding, and change. Helping you move through difficult times, one step at a time.",
  nav: [{
    id: "about",
    label: "About",
    href: "/about/"
  }, {
    id: "individual-therapy",
    label: "Therapy",
    href: "/individual-therapy/"
  }, {
    id: "clinical-supervision",
    label: "Supervision",
    href: "/clinical-supervision/"
  }, {
    id: "research",
    label: "Research",
    href: "/research/"
  }, {
    id: "contact",
    label: "Contact",
    href: "/contact/"
  }],
  credentials: [{
    label: "HCPC registered",
    tooltip: "Health and Care Professions Council (HCPC) registered"
  }, {
    label: "BABCP accredited",
    tooltip: "British Association for Behavioural and Cognitive Psychotherapies (BABCP) accredited"
  }, {
    label: "Trained at Oxford",
    tooltip: "Doctorate in Clinical Psychology, University of Oxford"
  }],
  homeIntro: "Horizon Psychology is led by Dr Emma Izon. She provides evidence-based psychological therapy tailored to each person's individual needs and goals, drawing on cognitive behavioural therapy (CBT), acceptance and commitment therapy (ACT), compassion-focused approaches, systemic and narrative therapies. Her practice is compassionate, neurodiversity-affirming, and grounded in creating a safe, non-judgemental space for lasting understanding, resilience, and change.",
  services: [{
    id: "individual-therapy",
    icon: "individual-therapy",
    title: "Individual therapy",
    href: "/individual-therapy/",
    eyebrow: "Therapy",
    meta: "£100 · 50 minutes",
    fee: "£100",
    duration: "50-minute session",
    summary: "Support for anxiety, low mood, trauma, stress, adjusting to change, and living with a long-term condition.",
    paragraphs: ["We offer personalised therapy in a warm, safe, and confidential environment, tailored to your individual needs. Our clinicians support people experiencing a wide range of difficulties, including depression, anxiety, stress, low self-esteem, adjustment to life changes as well as physical health challenges.", "We also provide specialist support for athletes managing injury, performance stress, and the psychological demands of sport. Together, we work towards greater understanding, resilience, and lasting positive change.", "Before starting therapy, we offer a free 15-minute introductory call to answer any questions and help you decide whether we're the right fit. During your initial assessment, we'll agree on a session frequency that best supports your goals."],
    practical: ["Free 15-minute introductory call", "Online or face-to-face in Buckinghamshire", "No referral needed", "48 hours' notice to cancel or reschedule"]
  }, {
    id: "couples-therapy",
    icon: "couples-therapy",
    title: "Couples and partner therapy",
    href: "/couples-therapy/",
    eyebrow: "Therapy",
    meta: "£120 · 60 minutes",
    fee: "£120",
    duration: "60-minute session",
    summary: "For any two people working on a shared difficulty. You do not need to be in a romantic relationship.",
    paragraphs: ["We offer couples and partner therapy in a safe, supportive, and confidential environment for any two people looking to improve their relationship or work through a shared difficulty — you do not need to be in a romantic relationship.", "Using evidence-based systemic and cognitive behavioural approaches, we help you understand the patterns within your relationship, improve communication, navigate conflict, and strengthen your connection.", "Most sessions are attended together, although individual sessions may be offered where appropriate and agreed by all parties. During your initial assessment, we'll discuss your goals and recommend a session frequency that best supports your progress."],
    practical: ["Free 15-minute introductory call", "Online or face-to-face in Buckinghamshire", "Both partners usually attend together", "48 hours' notice to cancel or reschedule"]
  }, {
    id: "clinical-supervision",
    icon: "clinical-supervision",
    title: "Clinical supervision",
    href: "/clinical-supervision/",
    eyebrow: "Supervision",
    meta: "£130 · 60 minutes",
    fee: "£130",
    duration: "60-minute session",
    summary: "For psychologists, CBT therapists and healthcare professionals, including those working towards accreditation.",
    paragraphs: ["We offer clinical supervision for psychologists, CBT therapists, and other healthcare professionals in a supportive, collaborative, and reflective environment.", "Supervision is provided by Dr Emma Izon, a registered Clinical Psychologist and BABCP-accredited CBT therapist, and is suitable for professionals working towards or maintaining similar professional accreditations. We offer one-off, ad hoc, and ongoing supervision tailored to your individual clinical practice and professional development."],
    practical: ["One-off, ad hoc or ongoing", "Online or face-to-face in Buckinghamshire", "Suitable for BABCP accreditation routes", "Group supervision available on request"]
  }, {
    id: "research-supervision",
    icon: "research-supervision",
    title: "Research supervision",
    href: "/research-supervision/",
    eyebrow: "Supervision",
    meta: "£120 · 60 minutes",
    fee: "£120",
    duration: "60-minute session",
    summary: "Support at any stage of a research project, from proposal and ethics through to analysis and publication.",
    paragraphs: ["We offer research supervision for clinicians, trainees, and researchers seeking guidance at any stage of the research process.", "Whether you are developing a research proposal, designing a study, analysing data, or preparing work for publication, supervision provides a collaborative space to build confidence, develop your skills, and progress your project."],
    practical: ["Master's and Doctoral level", "Proposal, ethics, analysis, write-up", "Online or face-to-face in Buckinghamshire", "One-off or ongoing"]
  }],
  faqs: [{
    question: "How do I know if this is right for me?",
    answer: "You may not be completely sure whether therapy is right for you — and that's okay. Reaching this point often means something feels difficult, unsettled, or hard to carry on your own. Therapy can offer a supportive space to slow things down, make sense of what you're experiencing, and gently explore what might help.\nI offer a complimentary 15-minute initial consultation where you're welcome to ask questions and share what feels important to you. This is simply a chance to see whether working together feels comfortable and right for you, with no pressure to decide straight away."
  }, {
    question: "What happens after I get in touch?",
    answer: "After you get in touch, you will be contacted via email within 5 working days. This will usually include a response to your enquiry and, if helpful, the option to arrange a complimentary 15-minute consultation. This initial conversation is a chance to talk through what you're looking for, ask any questions, and see whether working together feels like a good fit.\nIf you decide to go ahead, we will arrange your first appointment at a time that works for you."
  }, {
    question: "Do you offer online sessions?",
    answer: "Yes, both online and in-person sessions are available. Online therapy is delivered securely via video call and can be a helpful option if you prefer the comfort of your own space, have a busy schedule, or are not local. In-person sessions are available in Buckinghamshire for those who prefer to meet face-to-face. Both formats offer the same level of care, confidentiality, and therapeutic support."
  }, {
    question: "Is therapy confidential?",
    answer: "Yes, therapy is confidential. Everything you share is treated with care and respect, and is not discussed outside of sessions. Confidentiality is a key part of creating a safe, trusting space where you can speak freely and at your own pace.\nThere are a small number of legal and ethical exceptions to confidentiality. These relate to situations where there may be a serious risk of harm to you or others, or where information is required by law. If anything like this were ever to arise, it would always be discussed with you first wherever possible."
  }, {
    question: "Will my GP be informed?",
    answer: "No, your GP will not be informed automatically. Therapy is confidential, and anything you share remains private unless you choose for it to be shared.\nThe exception to this is if there were serious concerns about safety or risk, in which case this would be discussed with you wherever possible beforehand."
  }, {
    question: "Do I need a referral?",
    answer: "No, you do not need a referral to begin therapy. You are welcome to get in touch directly to arrange an initial consultation or to ask any questions about the process."
  }, {
    question: "What are your fees and cancellation policy?",
    answer: "My fees are as outlined at the time of booking and are payable in advance of each session. If you need to cancel or reschedule your appointment, I kindly ask for at least 48 hours' notice so that the time can be offered to someone else. Cancellations made with less than 48 hours' notice will be charged at 50% of the session fee. Cancellations made with less than 24 hours' notice, or missed appointments without notice, will be charged at the full session fee."
  }],
  testimonials: [{
    name: "James",
    quote: "When I came to Emma, I was looking for someone with whom I could team up with on my journey of self understanding, who could provide suitable guidance along the way. Emma definitely provided what I was looking for. She was understanding, insightful and brought relevant, clinical knowledge."
  }, {
    name: "Sophie",
    quote: "I enjoyed having a space to express my feelings and thoughts that was warm and judgement free. I could really apply many of the methods and ideas she brought, to my daily interactions, and saw a positive impact."
  }, {
    name: "Laura",
    quote: "Thank you very much for all of the therapy sessions, I really appreciated them and feel I have learnt so much. You lent a non judgemental ear, and safe environment whereby I felt able to express myself and open up."
  }, {
    name: "Rachel",
    quote: "Emma created a safe and reassuring environment for my son to talk, listen and ask questions. Her focus was clearly on my son rather than him feeling it was adults talking about him or over him."
  }, {
    name: "Daniel",
    quote: "I very much enjoyed working with Emma. I had a very positive experience and would turn to her again in future if I was seeking support through psychology."
  }, {
    name: "Priya",
    quote: "I had a positive experience with Emma. I feel she understands my personal approach to psychology and our sessions, and I enjoyed working with her towards my goals."
  }],
  footerGroups: [{
    title: "Work together",
    links: [{
      id: "individual-therapy",
      label: "Individual therapy",
      href: "/individual-therapy/"
    }, {
      id: "couples-therapy",
      label: "Couples therapy",
      href: "/couples-therapy/"
    }, {
      id: "clinical-supervision",
      label: "Clinical supervision",
      href: "/clinical-supervision/"
    }, {
      id: "research-supervision",
      label: "Research supervision",
      href: "/research-supervision/"
    }]
  }, {
    title: "Practice",
    links: [{
      id: "about",
      label: "About Emma",
      href: "/about/"
    }, {
      id: "research",
      label: "Research",
      href: "/research/"
    }, {
      label: "Testimonials",
      href: "/testimonials/"
    }, {
      label: "Resources",
      href: "/resources/"
    }, {
      label: "FAQs",
      href: "/faqs/"
    }]
  }, {
    title: "Practical",
    links: [{
      id: "contact",
      label: "Contact",
      href: "/contact/"
    }, {
      label: "Fees and cancellations",
      href: "/terms-and-conditions/"
    }, {
      label: "Confidentiality",
      href: "/confidentiality/"
    }, {
      label: "Privacy policy",
      href: "/privacy-policy/"
    }, {
      label: "Complaints",
      href: "/complaints/"
    }]
  }],
  publications: [{
    authors: "Izon, E., Radez, J., & Knight, M. T.",
    year: "2023",
    title: "The psychosocial stressors of siblings of people with experiences of psychosis (SOPEP): A systematic narrative review across cultures.",
    journal: "Clinical Psychology & Psychotherapy"
  }, {
    authors: "Radez, J., Waite, F., Izon, E., & Johns, L.",
    year: "2023",
    title: "Identifying individuals at risk of developing psychosis: A systematic review of the literature in primary care services.",
    journal: "Early Intervention in Psychiatry, 17(5), 429–446"
  }, {
    authors: "Izon, E., Au-Yeung, K., Berry, K., & French, P.",
    year: "2023",
    title: "Service User Perceived Criticism and Warmth (SU-PCaW) Questionnaire.",
    journal: "Psychosis, 15(2), 201–210"
  }, {
    authors: "Izon, E., Berry, K., Law, H., & French, P.",
    year: "2022",
    title: "'If he feels better I'll feel better': relationships with individuals at high-risk of developing psychosis.",
    journal: "Early Intervention in Psychiatry, 16(3), 231–238"
  }, {
    authors: "Izon, E., Berry, K., Wearden, A., Carter, L-A., Law, H., & French, P.",
    year: "2021",
    title: "Investigating Expressed Emotion (EE) in individuals at-risk of developing psychosis and their families over 12 months.",
    journal: "Clinical Psychology & Psychotherapy"
  }, {
    authors: "Izon, E., Berry, K., Law, H., & French, P.",
    year: "2018",
    title: "Expressed emotion (EE) in families of individuals at-risk of developing psychosis: A systematic review.",
    journal: "Psychiatry Research, 270, 661–672"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Faqs = __ds_scope.Faqs;

__ds_ns.PublicationItem = __ds_scope.PublicationItem;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.TestimonialCarousel = __ds_scope.TestimonialCarousel;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Container = __ds_scope.Container;

__ds_ns.CredentialBadge = __ds_scope.CredentialBadge;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StarRating = __ds_scope.StarRating;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.MobileMenu = __ds_scope.MobileMenu;

__ds_ns.Navbar = __ds_scope.Navbar;

})();
