import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class Balloon extends Component {
    @action
    floatBalloon(index) {
        const balloonElement = document.querySelector('.balloon' + index);
        let position = window.innerHeight; // Initial position at the bottom of the screen
        console.log('balloon' + index);
        console.log(balloonElement);
        balloonElement.style.right = `${(index + 1) * 50}px`;
        const speed = 2; // Floating speed in pixels per frame

        // Define the floating animation function
        const floatAnimation = () => {
            position -= speed; // Update the position

            // Set the new position
            balloonElement.style.top = `${position}px`;

            // Check if the balloon has floated off the screen
            if (position < -balloonElement.offsetHeight) {
                // Stop the floating animation
                this.stopFloatingBalloon();
            } else {
                // Continue the animation on the next frame
                requestAnimationFrame(floatAnimation);
            }
        };

        // Start the floating animation
        requestAnimationFrame(floatAnimation);

        // Optional: Stop the floating after a certain duration
        later(this, this.stopFloatingBalloon, 5000); // Stop floating after 5 seconds
    }

    stopFloatingBalloon() {
        // Stop the floating animation by canceling the requestAnimationFrame
        cancelAnimationFrame(this.floatAnimation);
    }
}