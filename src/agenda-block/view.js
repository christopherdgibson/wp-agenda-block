/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
// console.log(
// 	"Hello World! (from create-block-agenda-block block view.js file)",
// );
/* eslint-enable no-console */

document.addEventListener("DOMContentLoaded", () => {
	const meetingButtons = document.querySelectorAll(".card.card-small");
	const meetingATags = document.querySelectorAll(".card.card-part")
	const meetingDescriptionsContainer = document.querySelector(".meeting-description-container");
	const meetingDescriptions = document.querySelectorAll(".card-description");
	if (meetingButtons && meetingDescriptions) {
		meetingButtons.forEach((btn) => {
			btn.addEventListener("click", function () {
				meetingDescriptions.forEach((desc) => {
					desc.className = "card card-large card-description";
					meetingDescriptionsContainer.style.display = "grid";
					desc.querySelector(".close-popup").addEventListener("click", function () {
						meetingDescriptionsContainer.style.display = "none";
					})
				});
				document.querySelector(
					'.card-description[data-index="' + this.dataset.index + '"]',
				).className = "card card-large card-description card-description-select";
			});
				window.addEventListener("click", (event) => {
					if (event.target === meetingDescriptionsContainer) {
					meetingDescriptionsContainer.style.display = "none";
					}
				});
		});
		meetingATags.forEach((aTag) => {
			aTag.addEventListener("click", function (e) {
				e.stopPropagation(); // prevent the parent button click from firing too
				meetingDescriptions.forEach((desc) => {
					desc.className = "card card-large card-description";
					meetingDescriptionsContainer.style.display = "grid";
				});
				document.querySelector(
					'.card-description[data-index="' + this.dataset.index + '"][data-sub-index="' + this.dataset.subIndex + '"]'
				).className = "card card-large card-description card-description-select";
			});
		});
	}
});
