
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
imageAspectRatio.forEach(imageAspectRatio => {
	const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	
	let scrollTo = $('.scroll-to');
	if(scrollTo) {
		event.preventDefault();
		let section;
	
		section = document.querySelector(scrollTo.getAttribute('href'))
	
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <lazyload> -=-=-=-=-=-=-=-=-=-=-=-=

new LazyLoad();

// =-=-=-=-=-=-=-=-=-=-=-=- </lazyload> -=-=-=-=-=-=-=-=-=-=-=-=
 */


// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.split-text').forEach(splitText => {
	splitText.style.opacity = 0;
})

function runSplit() {

	const splitText = document.querySelectorAll(".split-text");
	splitText.forEach(splitText => {
		let typeSplit;
		
		typeSplit = new SplitType(splitText, {
			types: "lines"
		});
	
		Array.from(typeSplit.lines).forEach(line => {
			let addLine;
			addLine = line.cloneNode(true);
			addLine.classList.remove('line')
			addLine.classList.add('line-body');
			if(splitText.classList.contains('_animated')) addLine.style.transform = 'translate3d(0,0,0)';
			line.innerHTML = "";
			line.append(addLine)
		})

		splitText.style.opacity = 1;
	})

}

gsap.set(header, {
	opacity: 0,
})

window.addEventListener('load', function (event) {
	runSplit();

	setTimeout(() => {

		let prevWidthScreen = 0;

		

		gsap.to(header, {
			duration: 1,
			opacity: 1,
		})

		function resizeAnim() {

			if(prevWidthScreen != window.innerWidth) {

				prevWidthScreen = window.innerWidth;

				runSplit();
				const animSections = document.querySelectorAll('.anim-section');				

				animSections.forEach(animSection => {
					let timeline = gsap.timeline({
						scrollTrigger: {
							trigger: animSection,
							start: 'top 75%',
						},
					});

					let animItems = animSection.querySelectorAll('[data-anim-index]'),
					animItemsArray = [];
					if(animItems.length) {
						animItems.forEach(animItem => {
							animItemsArray.push(animItem);
						})
						animItemsArray.sort(function(a, b) {
							return Number(a.dataset.animIndex) - Number(b.dataset.animIndex);
						});
					}

					Array.from(animItemsArray).forEach(animItem => {

						if(!animItem.classList.contains('_animated')) {
							
							if(animItem.classList.contains('split-text')) {
								
								if(!animItem.classList.contains('_alt-anim-text') && !animItem.classList.contains('_animated')) {
									const lines = animItem.querySelectorAll('.line-body');
									
									if(lines[0]) {
										gsap.set(lines, {
											opacity:0,
										})
										timeline.to(lines, {
											transform: 'translate3d(0,0,0)',
											opacity: 1,
											duration: 1,
											delay: 0.2,
											stagger: 0.1,
											ease: "power3.out",
											onComplete: function () {
												if(lines[0].closest('.split-text')) lines[0].closest('.split-text').classList.add('_animated');
											}
										}, animItem.dataset.animTimelinePosition ? animItem.dataset.animTimelinePosition : "-=0.3")
									}
								} else if(animItem.classList.contains('_alt-anim-text') && !animItem.classList.contains('_animated')) {
									const lines2 = animItem.querySelectorAll('.line-body');
									if(lines2[0]) {
										timeline.to(lines2, {
											transform: 'translate3d(0,0,0)',
											opacity: 1,
											duration: 0.5,
											stagger: 0.1,
											ease: "power3.out",
											onComplete: function () {
												if(lines2[0].closest('.split-text')) lines2[0].closest('.split-text').classList.add('_animated');
											}
										},animItem.dataset.animTimelinePosition ? animItem.dataset.animTimelinePosition : "-=0.7")
									}
								}
								
							}

							if(animItem.classList.contains('fade-up') || animItem.classList.contains('fade-down') || animItem.classList.contains('fade-in')) {

								gsap.set(animItem, {
									opacity: 0,
								})

								if(animItem.classList.contains('anim-up')) {
									gsap.set(animItem, {
										y: 50,
									})	
								}

								if(animItem.classList.contains('fade-up')) {
									gsap.set(animItem, {
										y: 50,
										opacity: 0,
									})	
								}

								timeline.to(animItem, {
									duration: 0.5,
									opacity: 1,
									y: 0,
									ease: "power2.easeInOut",
									onComplete: function () {
										animItem.classList.add('_animated');
									}
								}, animItem.dataset.animTimelinePosition ? animItem.dataset.animTimelinePosition : "-=0.7")

							} 

							if(animItem.classList.contains('anim-video')) {
								gsap.to(animItem, {
									duration: 0.1,
									scrollTrigger: {
										start: "35% top",
										//end: "center center",
										//markers: true
									},
									onComplete: function () {
										animItem.classList.add('_animated');
										const video = animItem.querySelector('video');
										video.loop = true;
										setTimeout(() => {
											video.play();
										},500)
									}
								})
							}
							
						}

					})
					
					
		
					
		
					/* const fadeIn = animSection.querySelectorAll('.fade-in');
					fadeIn.forEach(fadeIn => {
						timeline.to(fadeIn, {
							duration: 1,
							opacity: 1,
							onComplete: function () {
								fadeIn.classList.add('_animated');
							}
						},"-=0.5")
					})
		
					const fadeDown = animSection.querySelectorAll('.fade-down');
					fadeDown.forEach(fadeDown => {
						timeline.to(fadeDown, {
							duration: 1,
							opacity: 1,
							transform: 'translate3d(0,0,0)',
						},"-=0.5")
					}) */
					
					
		
				})

				setTimeout(() => {
					ScrollTrigger.refresh(true)
				},100)
			}

		}

		resizeAnim();
		window.addEventListener("resize", resizeAnim);

	},500)

})

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=
