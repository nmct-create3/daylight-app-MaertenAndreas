/**
 * @param {number} timestamp The timestamp in milliseconds
 */
export const parseMillisecondsIntoReadableTime = (timestamp) => {
	//Get hours from milliseconds
	const date = new Date(timestamp);
	// Hours part from the timestamp
	const hours = '0' + date.getHours();
	// Minutes part from the timestamp
	const minutes = '0' + date.getMinutes();
	// Seconds part from the timestamp (gebruiken we nu niet)
	// const seconds = '0' + date.getSeconds();

	// Will display time in 10:30(:23) format
	return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

export default {
    parseMillisecondsIntoReadableTime
}
