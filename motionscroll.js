/*!
 * JavaScript scroll animation library
 *
 * Copyright (c) 2023 @louisho5
 * Under the MIT license.
 *
 * @version 0.1.0
 */

"use strict";

class MotionScroll {
  constructor(options = {}) {
    this.options = options;

    if (typeof options === 'string') {
      this.options = { container: options };
    } else {
      this.options = options;
    }

    if (this.options.container == undefined) {
      this.options.container = '.motionscroll';
    }
    if (this.options.layer == undefined) {
      this.options.layer = '[data-motionscroll-to],[data-motionscroll-animate]';
    }
    if (this.options.ease == undefined) {
      this.options.ease = 'linear';
    }
    if (this.options.offsetTop == undefined) {
      this.options.offsetTop = 0;
    }
    if (this.options.offsetBottom == undefined) {
      this.options.offsetBottom = 0;
    }
    if (this.options.override == undefined) {
      this.options.override = false;
    }
    if (this.options.reverse == undefined) {
      this.options.reverse = true;
    }
    if (this.options.playOnce == undefined) {
      this.options.playOnce = false;
    }
    this.options.override = (this.options.override) ? " !important" : "";
    this.destroy = this.destroy.bind(this);
    this.init = this.init.bind(this);
    document.addEventListener("DOMContentLoaded", this.init);
  }

  destroy() {
    var motionscrollContainer = this.options.container;
    var motionscrollLayer = this.options.layer;

    var motionscroll = document.querySelectorAll(motionscrollContainer);
    motionscroll.forEach(function(msContainer){
      var motionscrollLayers = msContainer.querySelectorAll(motionscrollLayer);
      motionscrollLayers.forEach(function(msLayer) {
        msLayer.classList.forEach(function(className) {
          if (className.startsWith("_motionscroll-animate-")) {
            msLayer.classList.remove(className);
          }
        });
      });
    });
    window.removeEventListener("beforeunload", this.destroy);
  }

  init() {
    var motionscrollContainer = this.options.container;
    var motionscrollLayer = this.options.layer;
    var easeMode = this.options.ease;
    var offsetTop = this.options.offsetTop;
    var offsetBottom = this.options.offsetBottom;
    var override = this.options.override;
    var reverse = this.options.reverse;
    var playOnce = this.options.playOnce;
    var played = false;
    var generatedNumbers = new Set();
    function generateRandomPrefixNumber() {
      var prefix, number, paddedNumber, randomPrefixNumber;
      do {
        prefix = Math.floor(Math.random() * 256);
        number = Math.floor(Math.random() * 65536);
        paddedNumber = number.toString(16).padStart(4, '0');
        randomPrefixNumber = 'ms' + prefix.toString(16) + paddedNumber;
      } while (generatedNumbers.has(randomPrefixNumber));
        generatedNumbers.add(randomPrefixNumber);
      return randomPrefixNumber;
    }

        var motionscroll = document.querySelectorAll(motionscrollContainer);
        motionscroll.forEach(function(msContainer){
          var motionscrollLayers = msContainer.querySelectorAll(motionscrollLayer);
          motionscrollLayers.forEach(function(msLayer) {
            var dataMsTo = msLayer.getAttribute('data-motionscroll-to') || null;
            var dataMsAnimate = msLayer.getAttribute('data-motionscroll-animate') || null;
            var prefixNumber = generateRandomPrefixNumber();

            var msStyle = `
            <style>
            ._motionscroll-animate-${prefixNumber} {
              animation: ${prefixNumber}-animate 1s ${easeMode} infinite${override};
              animation-play-state: paused${override};
              animation-delay: calc(var(--${prefixNumber}-progress) * -1s)${override};
              animation-iteration-count: 1${override};
              animation-fill-mode: both${override};
            }`;

            if (dataMsAnimate) {
              msStyle += `
              @keyframes ${prefixNumber}-animate {
                ${dataMsAnimate}
              }
              </style>`;
            } else if (dataMsTo) {
              msStyle += `
              @keyframes ${prefixNumber}-animate {
                to {
                  ${dataMsTo}
                }
              }
              </style>`;
            }
            document.head.insertAdjacentHTML("beforeend", msStyle);

            msLayer.classList.add(`_motionscroll-animate-${prefixNumber}`);
            
            //var start = window.innerHeight - msContainer.offsetTop + offsetTop;
            var viewportHeight = window.innerHeight;
            window.addEventListener('scroll', function() {
              var currentPosition = window.innerHeight - (msContainer.offsetTop - window.pageYOffset);
              var viewportPercentage = Math.max(0, Math.min(100, Math.round((currentPosition) / (viewportHeight + msContainer.offsetHeight) * 100)));
              var percentage = Math.max(0, Math.min(100, Math.round((currentPosition - offsetTop) / (viewportHeight + msContainer.offsetHeight - offsetTop - offsetBottom) * 100)));
              if(playOnce && percentage >= 99) {
                msContainer.style.setProperty(`--${prefixNumber}-progress`, 1);
                played = true;
              } else if(playOnce && !played) {
                msContainer.style.setProperty(`--${prefixNumber}-progress`, percentage/100);
              } else if(!playOnce && reverse) {
                if(percentage >= 99) {
                  msContainer.style.setProperty(`--${prefixNumber}-progress`, 1);
                } else {
                  msContainer.style.setProperty(`--${prefixNumber}-progress`, percentage/100);
                }
              } else if(!playOnce && !reverse) {
                if(percentage >= 99) {
                  msContainer.style.setProperty(`--${prefixNumber}-progress`, 1);
                  played = true;
                } else if(viewportPercentage <= 1) {
                  msContainer.style.setProperty(`--${prefixNumber}-progress`, 0);
                  played = false;
                } else if(!played) {
                  msContainer.style.setProperty(`--${prefixNumber}-progress`, percentage/100);
                }
              }
            });

            
        });
    });

    window.dispatchEvent(new Event('scroll'));
    
    document.addEventListener("resize", function(){
      window.dispatchEvent(new Event('scroll'));
    });
  }
}
