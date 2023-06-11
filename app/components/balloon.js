import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class Balloon extends Component {
    @action
    floatBalloon(index) {
        document.body.style.overflow = 'hidden';
        const balloonElement = document.querySelector('.balloon' + index);
        let position = Math.random() * ((window.innerHeight - balloonElement.offsetHeight - 10) * 2); // Initial position at the bottom of the screen
        console.log('balloon' + index);
        console.log(balloonElement);



        const horizontalRandomizer = 5; // Adjust this based on your desired range

        balloonElement.style.padding = Math.random() * horizontalRandomizer + 'px';
        balloonElement.style.right = Math.random() * horizontalRandomizer + 'px';
        balloonElement.style.left = Math.random() * horizontalRandomizer + 'px';
        const speed = 0.2; // Floating speed in pixels per frame

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