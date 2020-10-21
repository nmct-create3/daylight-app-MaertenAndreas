import { ApiKey, Country } from './constants.js'
import Data from './data.js'
import Util from './util.js'

export default class DaylightApp {
	_data;
	_ready = false;
	dom = {};

	/**
	 * @param {number} lat 
	 * @param {number} lon
	 */
	constructor(lat, lon) {
		this.lat = lat;
		this.lon = lon;

		this._fetchApi();
	}

	/**
	 * @private
	 */
	async _fetchApi() {
		const response = await Data.get('https://api.openweathermap.org/data/2.5/forecast', {
			appid: ApiKey,
			cnt: 1,
			lang: 'nl',
			lat: this.lat,
			lon: this.lon,
			units: 'metric'
		});

		this._data = await response.json();
		this.ready();
	}

	/**
	 * @private
	 */
	_setData() {
		const {
			country,
			name,
			sunrise,
			sunset
		} = this._data.city;

		this.dom.sunrise.innerHTML = Util.parseMillisecondsIntoReadableTime(sunrise * 1e3);
		this.dom.sunset.innerHTML = Util.parseMillisecondsIntoReadableTime(sunset * 1e3);

		this.dom.location.innerHTML = name +', '+ Country[country];

		document.body.classList.add('is-loaded');

		this._sunAndTimeUpdater(sunrise, sunset);
	}

	/**
	 * @private
	 * @param {number} sunset Timestamp in seconds
	 */
	_setTimeRemaining(sunset) {
		const currentTime = Date.now();

		const timeRemaing = Util.parseMillisecondsIntoReadableTime(sunset * 1e3 - currentTime);

		const [hours, minutes] = timeRemaing.split(':');

		this.dom.timeLeft.innerHTML = `${parseInt(hours) > 1 ? parseInt(hours) + ' hours, ': ''}${parseInt(minutes)} minutes`;
	}

	/**
	 * @private
	 * @param {number}
	 * @param {number}
	 */
	_setSunPosition(sunrise, difference) {
		const currentTime = Date.now();

		this.dom.sun.dataset.time = Util.parseMillisecondsIntoReadableTime(currentTime);

		const left = (currentTime - sunrise * 1e3) / (difference * 10);
		// Naive calculation, this will give a linear result but is enough for the task
		const bottom = left > 50 ? 100 - ((currentTime - sunrise * 1e3) / (difference * 1e3 / 2)) : (currentTime - sunrise * 1e3) / (difference * 1e3 / 2);

		this.dom.sun.style.left = left + '%';
		this.dom.sun.style.bottom = bottom + '%';
	}

	/**
	 * @private
	 * @param {number} sunrise
	 * @param {number} sunset
	 */
	_sunAndTimeUpdater(sunrise, sunset) {
		this._setSunPosition(sunrise, sunset - sunrise);
		this._setTimeRemaining(sunset);

		setTimeout(() => this._setData(), 6e4);
	}

	domLookup(e) {
		this.dom.sunrise = document.querySelector('.js-sunrise');
		this.dom.sunset = document.querySelector('.js-sunset');

		this.dom.location = document.querySelector('.js-location');

		this.dom.sun = document.querySelector('.js-sun');

		this.dom.timeLeft = document.querySelector('.js-time-left');

		this.ready();
	}

	ready() {
		if (this._ready) this._setData();
		this._ready = true;
	}
}
