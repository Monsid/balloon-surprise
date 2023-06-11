import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class Balloon extends Component {


    get speed() {
        console.log(this.deviceAspectRatio);
        if (this.deviceAspectRatio < 0.5) {
            return 1.4;
        } else if (this.deviceAspectRatio < 1) {
            return 1.1;
        } else if (this.deviceAspectRatio < 1.5) {
            return 0.8;
        } else if (this.deviceAspectRatio < 2) {
            return 0.5;
        } else {
            return 0.2;
        }
    }

    @action
    floatBalloon(index) {

        let speed = this.speed;
        const balloonElement = document.querySelector('.balloon' + index);
        let position = Math.random() * ((window.innerHeight - balloonElement.offsetHeight - 10) * 2); // Initial position at the bottom of the screen
        console.log('balloon' + index);
        console.log(balloonElement);



        const horizontalRandomizer = 5; // Adjust this based on your desired range

        balloonElement.style.padding = Math.random() * horizontalRandomizer + 'px';


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
    get deviceAspectRatio() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return width / height;
    }
}