# Third-party sources

- Three.js r128 is pinned to the version requested by V5. Downloaded from https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js on 10 Oct 2026. License: https://raw.githubusercontent.com/mrdoob/three.js/r128/LICENSE . No claim that this is the current or production-audited release.
- V5 states its solar-position formulas are adapted from SunCalc. The exact original revision is not recorded. The current upstream BSD-2-Clause license was preserved from https://raw.githubusercontent.com/mourner/suncalc/master/LICENSE on 10 Oct 2026; do not interpret this as verifying the inherited algorithm or its adaptation history.
- OneMap attribution remains in the UI when enabled. No OneMap tiles were copied into this package.
- The project images and embedded plans have separate, unresolved public-use rights. Neither open-source license above grants permission to publish them.

- V7 adds jsPDF 4.2.1, downloaded from https://cdn.jsdelivr.net/npm/jspdf@4.2.1/dist/jspdf.umd.min.js; MIT licence from https://raw.githubusercontent.com/parallax/jsPDF/v4.2.1/LICENSE . No HTML-to-PDF or remote image loading is used.
- User-supplied agent images remain unchanged; QR decoding was local using jsQR 1.4.0 for development only (not shipped).

V8: supplied site plan copied unchanged for explicitly authorised private tracing. OneMap official logo from https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png is used for required attribution. Basemap tiles are requested directly, not shipped as an offline archive. See docs/20 for current service/terms references.
