import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Balloon extends Component {
    floatAnimationIds = new Map(); // Map to store animation frame IDs for each balloon
    speed = 0.01; // Floating speed in pixels per frame
    startPosition = window.innerHeight;

    @action
    floatBalloons(delay) {
        const balloonElements = document.querySelectorAll('.balloon');
        let delayTime = 0;

        balloonElements.forEach((balloonElement, index) => {
            let position = this.startPosition - balloonElement.offsetHeight - 1; // Initial position for each balloon (50 pixels apart horizontally)
            balloonElement.style.right = `${(index + 1) * 50}px`;
            setTimeout(() => {
                this.startFloatingBalloon(balloonElement, position);
            }, delayTime);
            delayTime += delay;
        });
        // Define the floating animation function for each balloon

    }



    startFloatingBalloon(balloonElement, position) {
        const floatAnimation = () => {
            const currentPos = parseFloat(balloonElement.style.top) || position;
            const newPos = currentPos - this.speed; // Update the position

            // Set the new position
            balloonElement.style.top = `${newPos}px`;

            // Check if the balloon has floated off the screen
            if (newPos <= 1) {
                // Stop the floating animation for this balloon
                this.stopFloatingBalloon(balloonElement);
            } else {
                // Continue the animation on the next frame
                this.floatAnimationIds.set(balloonElement, requestAnimationFrame(floatAnimation));
            }
        };

        // Start the floating animation for each balloon
        this.floatAnimationIds.set(balloonElement, requestAnimationFrame(floatAnimation));
    }




    stopFloatingBalloon(balloonElement) {
        // Stop the floating animation for the specified balloon by canceling the requestAnimationFrame
        const animationId = this.floatAnimationIds.get(balloonElement);
        cancelAnimationFrame(animationId);
        this.floatAnimationIds.delete(balloonElement);
    }
}