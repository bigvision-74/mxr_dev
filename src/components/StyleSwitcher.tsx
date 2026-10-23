export function StyleSwitcher() {
  return (
    <div className="style-switcher">
      <button className="style-switcher-toggle" aria-expanded="false">
        <span>✦</span> Style
      </button>
      <div className="style-panel" hidden>
        <div className="style-panel-head">
          <div>
            <small>VISUAL STYLE</small>
            <strong>Customise</strong>
          </div>
          <button className="style-close" aria-label="Close style panel">×</button>
        </div>
        <fieldset>
          <legend>Theme</legend>
          <div className="theme-options">
            <button className="theme-option" data-theme="charcoal">
              <span className="swatch grey-swatch"></span>
              <span><b>Charcoal</b><small>Default</small></span>
            </button>
            <button className="theme-option" data-theme="navy">
              <span className="swatch navy-swatch"></span>
              <span><b>Navy</b><small>Classic</small></span>
            </button>
            <button className="theme-option" data-theme="teal">
              <span className="swatch teal-swatch"></span>
              <span><b>Teal</b><small>Fresh</small></span>
            </button>
            <button className="theme-option" data-theme="indigo">
              <span className="swatch indigo-swatch"></span>
              <span><b>Indigo</b><small>Bold</small></span>
            </button>
            <button className="theme-option" data-theme="evergreen">
              <span className="swatch evergreen-swatch"></span>
              <span><b>Evergreen</b><small>Natural</small></span>
            </button>
            <button className="theme-option" data-theme="bae-red">
              <span className="swatch red-swatch"></span>
              <span><b>Red</b><small>Impact</small></span>
            </button>
          </div>
        </fieldset>
        <fieldset>
          <label className="font-label" htmlFor="font-variation">Font</label>
          <select id="font-variation">
            <option value="segoe">Segoe UI (default)</option>
            <option value="inter">Inter</option>
            <option value="lato">Lato</option>
            <option value="roboto">Roboto</option>
            <option value="open-sans">Open Sans</option>
            <option value="rubik">Rubik</option>
            <option value="poppins">Poppins</option>
            <option value="arial">Arial</option>
            <option value="trebuchet">Trebuchet MS</option>
          </select>
        </fieldset>
        <p className="style-note">Style preferences are saved to your browser.</p>
      </div>
    </div>
  )
}
