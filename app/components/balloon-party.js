import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BalloonParty extends Component {
    @tracked balloonMaxWidth;
    @tracked numberOfBalloons;
    @tracked balloonsPerRow = 3;

    get calculatedRows() {
        return Math.ceil(Number(this.numberOfBalloons) / this.balloonsPerRow);
    }

    @action
    calculateBalloonDimentions(numberOfBalloons) {
        document.body.style.overflow = 'hidden';
        const onePercentPadding = window.innerWidth / 100;
        this.balloonMaxWidth =
            window.innerWidth / numberOfBalloons - onePercentPadding;
        this.numberOfBalloons = numberOfBalloons;
    }
}