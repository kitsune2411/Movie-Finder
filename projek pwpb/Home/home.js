const chevronRight =
    '<svg viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>';
const chevronLeft =
    '<svg viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>';

class Carousel {
    constructor(slides, configuration, parent = document.body) {
        this.slides = slides;
        this.configuration = configuration;
        this.parent = parent;
    }

    wrapper = null;
    currentIndex = 0;
    revealOffset = 75;
    classNames = {
        wrapper: "carousel-wrapper",
        slide: "carousel-slide",
        active: "is-active",
        navigation: {
            arrows: "carousel-arrow",
            leftArrow: "left-arrow",
            rightArrow: "right-arrow",
            dots: "carousel-dots"
        }
    };
    swipe = {
        active: false,
        threshold: 100,
        offset: 0
    };

    init() {
        this.setCarouselWrapper();
        this.setSlides();
        this.setNavigation();
    }

    navigate(direction) {
        if (this.configuration.infinite) {
            this.currentIndex =
                direction === 1
                    ? (this.currentIndex + 1) % this.slides.length
                    : this.currentIndex === 0
                    ? this.slides.length - 1
                    : this.currentIndex - 1;
        } else {
            this.currentIndex =
                direction === 1
                    ? this.currentIndex < this.slides.length - 1
                        ? this.currentIndex + 1
                        : this.currentIndex
                    : this.currentIndex > 0
                    ? this.currentIndex - 1
                    : this.currentIndex;
        }

        this._setOffsetCustomProperty(
            direction === 1 ? this.revealOffset : -this.revealOffset
        );
        this._setCurrentSlide(this.currentIndex);
        this._setActiveDot(this.currentIndex);
    }

    goToSlide(index) {
        this._setOffsetCustomProperty(
            index > this.currentIndex ? this.revealOffset : -this.revealOffset
        );
        this._setCurrentSlide(index);
        this._setActiveDot(index);
        this.currentIndex = index;
    }

    setNavigation() {
        this.setDotsNavigation();
        this.setArrowsNavigation();
        this.setPointerEvents();
    }

    setPointerEvents() {
        this.wrapper.addEventListener("pointerdown", (e) =>
            this._handlePointerDown(e)
        );
        this.wrapper.addEventListener("pointerup", (e) =>
            this._handlePointerUp(e)
        );
    }

    setDotsNavigation() {
        if (!this.configuration.dots) return;

        const dotsNavigation = document.createElement("div");
        dotsNavigation.classList.add(this.classNames.navigation.dots);

        this.slides.forEach((slide, i) => {
            const button = document.createElement("button");

            if (i === this.currentIndex)
                button.classList.add(this.classNames.active);

            button.title = `See ${slide.title}`;
            button.addEventListener("pointerdown", () => this.goToSlide(i));

            dotsNavigation.append(button);
        });

        this.wrapper.append(dotsNavigation);
    }

    setArrowsNavigation() {
        if (!this.configuration.arrows) return;

        const arrows = [
            {
                id: "prev",
                icon: chevronLeft,
                className: this.classNames.navigation.leftArrow,
                label: "Go to previous slide",
                action: () => this.navigate(-1)
            },
            {
                id: "next",
                icon: chevronRight,
                className: this.classNames.navigation.rightArrow,
                label: "Go to next slide",
                action: () => this.navigate(1)
            }
        ];

        arrows.forEach((arrow) => {
            const button = document.createElement("button");

            button.classList = `${this.classNames.navigation.arrows} ${arrow.className}`;
            button.innerHTML = arrow.icon;
            button.title = arrow.label;
            button.addEventListener("pointerdown", arrow.action);
            this.wrapper.append(button);
        });
    }

    setSlides() {
        this.slides.forEach((slide, i) => {
            const slideDiv = document.createElement("div");

            slideDiv.classList.add(this.classNames.slide);
            slideDiv.setAttribute("data-slide", i);
            slideDiv.style.backgroundColor = slide.background;

            if (i === 0) slideDiv.classList.add(this.classNames.active);

            const slideText = document.createElement("div");
            const h1 = document.createElement("h1");
            const p = document.createElement("p");

            h1.innerText = slide.title;
            p.innerText = slide.paragraph;
            slideText.append(h1, p);
            slideDiv.append(slideText);
            this.wrapper.append(slideDiv);
        });
    }

    setCarouselWrapper() {
        const div = document.createElement("div");

        div.classList.add(this.classNames.wrapper);
        this.parent.append(div);
        this.wrapper = div;
    }

    _handlePointerDown({ clientX }) {
        this.swipe.active = true;
        this.swipe.offset = clientX;
    }

    _handlePointerUp({ clientX }) {
        if (!this.swipe.active) return;

        this.swipe.active = false;

        const tapped = this.swipe.offset === clientX;
        const reachedThreshold =
            Math.abs(clientX - this.swipe.offset) >= this.swipe.threshold;

        if (tapped || !reachedThreshold) return;

        if (clientX < this.swipe.offset) this.navigate(1);
        else this.navigate(-1);

        this.swipe.offset = 0;
    }

    _setCurrentSlide(index) {
        [...this.wrapper.children].forEach((slide) => {
            if (+slide.dataset.slide === index)
                slide.classList.add(this.classNames.active);
            else slide.classList.remove(this.classNames.active);
        });
    }

    _setActiveDot(index) {
        const dots = this.wrapper.querySelector(
            `.${this.classNames.navigation.dots}`
        );

        [...dots.children].forEach((dot, i) => {
            if (i === index) dot.classList.add(this.classNames.active);
            else dot.classList.remove(this.classNames.active);
        });
    }

    _setOffsetCustomProperty(value) {
        this.wrapper.style.setProperty("--revealSlideOffset", `${value}px`);
    }
}

// Carrusel
// -----------------------------------------------------
const slides = [
    {
        title: "Slide 1",
        paragraph: "Lorem ipsum dolor sit amet...",
        background: "red"
    },
    {
        title: "Slide 2",
        paragraph: "Lorem ipsum dolor sit amet...",
        background: "turquoise"
    },
    {
        title: "Slide 3",
        paragraph: "Lorem ipsum dolor sit amet...",
        background: "coral"
    },
    {
        title: "Slide 4",
        paragraph: "Lorem ipsum dolor sit amet...",
        background: "limegreen"
    }
];

const configuration = { infinite: true, dots: true, arrows: true };
const carousel = new Carousel(slides, configuration);

carousel.init();

