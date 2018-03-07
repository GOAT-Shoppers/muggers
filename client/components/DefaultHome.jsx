import React from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';

const DefaultHome = () => {
  console.log('testing comp')
  return (
    <div>
      <h2>Welcome</h2>
      <div className="homepage genericBackground">
        <h3>Sign up for your mug today!</h3>
          <div>
          <div className="ipsum" >Coloring book austin health goth, pop-up try-hard tote bag scenester bicycle rights tattooed vaporware microdosing brunch squid banh mi. Pug raclette tacos, tofu enamel pin crucifix craft beer taxidermy af pitchfork. Activated charcoal lumbersexual YOLO cliche, marfa fanny pack hashtag polaroid quinoa post-ironic. Shabby chic next level intelligentsia you probably haven't heard of them vaporware waistcoat. Schlitz semiotics tofu narwhal. You probably haven't heard of them cornhole trust fund cloud bread literally ennui cardigan vice tofu chicharrones thundercats disrupt organic offal kinfolk.</div>
        <div className="homepageImage">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Teacup_clipart.svg/672px-Teacup_clipart.svg.png" />
        </div>
      </div>
      </div>
    </div>
  );
}

export default DefaultHome;
