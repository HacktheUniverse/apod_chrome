(function () {

  var FALLBACK_URI = '../images/fallback.jpg',
      FALLBACK_EXPLANATION = "It is a familiar sight to sky enthusiasts with even a small telescope.  There is much more to the <a href='http://en.wikipedia.org/wiki/Ring_nebula'>Ring Nebula (M57)</a>, however, than can be seen through a <a href='http://cl.jroo.me/z3/j/I/f/e/a.baa-Dog-watching-through-a-teles.jpg'>small telescope</a>.  The easily visible <a href='http://antwrp.gsfc.nasa.gov/apod/image/0303/m57ring_hst_big.jpg'>central ring</a> is about one <a href='http://chandra.harvard.edu/photo/cosmic_distance.html'>light-year</a> across, but <a href='http://www.robgendlerastropics.com/M57-HST-LBT.html'>this remarkably deep exposure</a> - a collaborative effort combining data from three different large telescopes - <a href='http://arxiv.org/abs/astro-ph/0401056'>explores</a> the looping filaments of glowing gas extending much farther from the nebula\'s <a href='http://hubblesite.org/newscenter/archive/releases/1997/ 38/background/'>central star</a>.  This remarkable <a href='http://www.robgendlerastropics.com/M57-HST-LBT.html'>composite image</a> includes narrowband hydrogen image, visible light emission, and <a href='http://missionscience.nasa.gov/ems/07_infraredwaves.html'>infrared light</a> emission.  Of course, in this <a href='http://www.caha.es/the-ring-nebula.html'>well-studied example</a> of a <a href='http://www.noao.edu/jacoby/'>planetary nebula</a>, the glowing material does not come from planets.  Instead, the <a href='ap030614.html'>gaseous shroud</a> represents outer layers expelled from a dying, sun-like star.  The <a href='https://www.youtube.com/watch?v=OiYRL3HFULU'>Ring Nebula</a> is about 2,000 light-years away toward the musical <a href='http://www.hawastsoc.org/deepsky/lyr/index.html'>constellation Lyra</a>. ",
      FALLBACK_TITLE = 'Rings Around the Ring Nebula';

  var Apod = React.createClass({

    getInitialState: function () {
      return {
        showCredit: false,
        showInfo: false,
        militaryTime: false
      }
    },

    render: function () {
      var infoClasses, creditClasses, time, date, timeFormat;

      infoClasses = React.addons.classSet({
        'info-container': true,
        'show-info': this.state.showInfo
      });

      creditClasses = React.addons.classSet({
        'credit': true,
        'show-credit': this.state.showCredit
      });

      timeFormat = this.state.militaryTime ? 'HH:mm:ss' : 'h:mm:ss';
      time = moment().format(timeFormat);
      date = moment().format('MMM D');

      return(
        <div>
          <img id='background' src={this.props.imageSrc} />
          <div id='gradient-overlay' />
          <h1>
            <a href='http://apod.nasa.gov'>Astronomy Picture of the Day</a>
          </h1>

          <div className='info-icon' onClick={this.showInfo}>?</div>
          <div className={infoClasses}>
            <div className='info-wrapper'>
              <div className='title' dangerouslySetInnerHTML={{ __html: this.props.title}} />
              <div className='info' dangerouslySetInnerHTML={{ __html: this.props.explanation}} />
            </div>
          </div>

          <div className='credit-icon' onClick={this.showCredit}>i</div>
          <div className='credit-container'>
            <div className={creditClasses}>
              All images are from <a href='http://apod.nasa.gov/'>APOD</a>. Extension made by <a href='http://twitter.com/ohohbot'>Ali</a> and <a href='http://twitter.com/flahertyb'>Bart</a> for fun.
            </div>
          </div>

          <div className='time' onClick={this.toggleMiltaryTime}>{time}</div>
          <div className='date'>{date}</div>

        </div>
      );
    },

    showInfo: function () {
      this.setState({showInfo: !this.state.showInfo});
    },

    showCredit: function () {
      this.setState({showCredit: !this.state.showCredit});
    },

    toggleMiltaryTime: function () {
      this.setState({militaryTime: !this.state.militaryTime});
    }
  });

  var getApod = function (onSuccess, onFailure) {
    reqwest({
      url: 'https://astronomy-pic-of-the-day.herokuapp.com/api.json',
      dataType: 'json',
      success: onSuccess,
      error: onFailure
    });
  };

  var render = function (imageSrc, explanation, title) {
    React.render(
      <Apod imageSrc={imageSrc} explanation={explanation} title={title} />,
      container
    );
  };

  var onApodSuccess = function (response) {
    render(response.url, response.explanation, response.title);
  };

  var onApodFailure = function (response) {
    render(FALLBACK_URI, FALLBACK_EXPLANATION, FALLBACK_TITLE);
  };

  getApod(onApodSuccess, onApodFailure);

}());
