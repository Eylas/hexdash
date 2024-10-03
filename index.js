import { months } from "./data.js";

const currentDayElement = document.getElementById("current-day");
const currentTimeElement = document.getElementById("current-time");
const currentWeekElement = document.getElementById("current-week");
const currentTempElement = document.getElementById("met-temp");
const currentRainElement = document.getElementById("met-rain");
const currentWindSpeedElement = document.getElementById("met-wind-speed");
const currentWindDirectionElement =
	document.getElementById("met-wind-direction");

// extends Date to add week number function
Date.prototype.getWeek = function () {
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return (
		1 +
		Math.round(
			((date.getTime() - week1.getTime()) / 86400000 -
				3 +
				((week1.getDay() + 6) % 7)) /
				7
		)
	);
};

// navigator.geolocation.getCurrentPosition((position) => {
// 	getWeatherInfo(position.coords.latitude, position.coords.longitude);
// });

// async function getWeatherInfo(lat, long) {
// 	const response = await fetch(
// 		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,rain,wind_speed_10m,wind_direction_10m`
// 	);
// 	const data = await response.json();

// 	currentTempElement.textContent = `Temp: ${data.current.temperature_2m}`;
// 	currentRainElement.textContent = `Rain: ${data.current.rain}`;
// 	currentWindSpeedElement.textContent = `Windspeed: ${data.current.wind_speed_10m}`;
// 	currentWindDirectionElement.textContent = `Wind direction: ${data.current.wind_direction_10m}`;

// 	console.log(data);
// }

function getCurrentDateInfo() {
	const dateObj = new Date();
	const currentTime = dateObj.toLocaleTimeString();
	const currentWeek = dateObj.getWeek();

	currentDayElement.textContent = `CURRENT DAY: ${dateObj.toLocaleDateString(
		"sv-SV"
	)}`;
	currentTimeElement.textContent = `CURRENT TIME: ${currentTime}`;
	currentWeekElement.textContent = `CURRENT WEEK: ${currentWeek}`;
}

function createCalendar() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth();
	let firstDay = new Date(year, month, 1);
	let lastDay = new Date(year, month + 1, 0);
	let previousMonthDate = new Date(year, month, 0).getDate();

	const calendarContainer = document.getElementById("calendar");

	let calendarRender = `<li>${firstDay.getWeek()}</li>`;

	for (let index = firstDay.getDate(); index > 0; index--) {
		calendarRender += `<li>${previousMonthDate - index + 1}</li>`;
	}

	for (let i = 1; i <= lastDay.getDate(); i++) {
		// if index is equal to a monday, add wk and day
		let dateCheck = new Date(year, month, i);
		if (dateCheck.getDay() === 1) {
			console.log(`day is ${i}`);
			calendarRender += `<li>${dateCheck.getWeek()}</li>`;
			calendarRender += `<li>${i}</li>`;
		} else {
			calendarRender += `<li>${i}</li>`;
		}
	}
	calendarContainer.innerHTML = calendarRender;
}

// setInterval(getCurrentDateInfo, 1000)
// setInterval(getWeatherInfo, 900000)
createCalendar();
// getWeatherInfo();
getCurrentDateInfo();
