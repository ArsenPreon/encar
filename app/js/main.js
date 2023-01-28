const swup = new Swup();
let slider = '';

function main () {
    let advantages__slider = new Swiper('.advantages__slider', {
        observer: true,
        observeParents: true,
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.advantages__arrow-next',
            prevEl: '.advantages__arrow-prev'
        },
        breakpoints: {
            320: {
                slidesPerView: 1.1,
                spaceBetween: 25,
                pagination: {
                    el:'.advantages__pagination',
                    clickable: true,
                },
            },
            768: {
                slidesPerView: 1
            }
        },
    })
    slider = advantages__slider;
    let menu = document.querySelector('.menu');
    let body = document.querySelector('.body');
    let header__burger = document.querySelector('.header__burger');
    let header__logo = document.querySelector('.header__logo');
    let headerMenuLogoAbout = document.querySelector('.menu__logo-about-2');
    let headerMenuLogo = document.querySelector('.menu__logo-about-1');
    if(document.querySelector('.header')){
        let headerElement = document.querySelector('.header');
        let callback = (entries) => {
    if(entries[0].isIntersecting){
        headerElement.classList.remove('_scroll');
        if(document.querySelector('.menu__logo-about-1')){
            headerMenuLogoAbout.classList.remove('_active');
            headerMenuLogo.classList.remove('_del');
        }
    }else{
        if(document.querySelector('.menu__logo-about-1')){
            headerMenuLogoAbout.classList.add('_active');
        headerMenuLogo.classList.add('_del');
        }
        headerElement.classList.add('_scroll');
    }
        }
        let headerObserver = new IntersectionObserver(callback);
        headerObserver.observe(headerElement)
    }
    window.addEventListener('resize', () => {
        if(header__burger.classList.contains('_active') && window.innerWidth >= 1345){
            menu.classList.remove('_active');
            header__logo.classList.remove('_del');
            body.classList.remove('_lock');
            header__burger.classList.remove('_active');
        } 
        if(header__burger.classList.contains('_active') && window.innerWidth <= 468){
            header__burger.classList.add('_del');
        }
        else{
            header__burger.classList.remove('_del');
        }
           
    })
    if(document.querySelector('._ibg')){
        function ibg(){

            let ibg=document.querySelectorAll("._ibg");
            for (var i = 0; i < ibg.length; i++) {
            if(ibg[i].querySelector('img')){
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
            }
            }
            }
            
        ibg();
    }
    if(document.querySelector('.popular')){
        let popular__slider = new Swiper('.popular__slider', {
            observer: true, 
            observeParents: true,
            spaceBetween: 29,
            slidesPerView: 3,
            loop: true,
            watchSlidesProgress: true,
            pagination:{
                el: '.popular__dotts',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                },
                768: {
                    slidesPerView: 2.2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        })
        
    }
    if(document.querySelector('.advantages')){
        let advantages__items = document.querySelectorAll('.advantages__item');
        advantages__slider.on('slideChange', () => {
            advantages__items.forEach(advantages__item => {
                advantages__item.classList.remove('_activeItem');
            })
            let slideId = advantages__slider.activeIndex;
            const advantageItemId = document.querySelector(`[data-item='${slideId}']`);
            advantageItemId.classList.toggle('_activeItem');
        })
    }
    if(document.querySelector('.avto__order')){
        let videoAvtoOrder = document.querySelector('.video__avto-order[data-goto]');
        if(videoAvtoOrder){
            videoAvtoOrder.addEventListener('click', scrollFunc);
            function scrollFunc (e) {
                let videoAvtoOrder = e.target;
                if(videoAvtoOrder.dataset.goto && document.querySelector(videoAvtoOrder.dataset.goto)){
                    let gotoBlock = document.querySelector(videoAvtoOrder.dataset.goto);
                    let gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;
                    window.scroll({
                        behavior: 'smooth',
                        top: gotoBlockValue,
                    })
                    e.preventDefault();
                }
            }
        }else{
            console.log('no');
        }
    }
    function dinamicAdaptive(){
        "use strict";
    
        function DynamicAdapt(type) {
            this.type = type;
        }
        
        DynamicAdapt.prototype.init = function () {
            const _this = this;
            // массив объектов
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            // массив DOM-элементов
            this.nodes = document.querySelectorAll("[data-da]");
        
            // наполнение оbjects объктами
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
        
            this.arraySort(this.оbjects);
        
            // массив уникальных медиа-запросов
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
                return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
        
            // навешивание слушателя на медиа-запрос
            // и вызов обработчика при первом запуске
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ',');
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
        
                // массив объектов с подходящим брейкпоинтом
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function () {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        
        DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
            if (matchMedia.matches) {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                }
            } else {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    if (оbject.element.classList.contains(this.daClassname)) {
                        this.moveBack(оbject.parent, оbject.element, оbject.index);
                    }
                }
            }
        };
        
        // Функция перемещения
        DynamicAdapt.prototype.moveTo = function (place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === 'last' || place >= destination.children.length) {
                destination.insertAdjacentElement('beforeend', element);
                return;
            }
            if (place === 'first') {
                destination.insertAdjacentElement('afterbegin', element);
                return;
            }
            destination.children[place].insertAdjacentElement('beforebegin', element);
        }
        
        // Функция возврата
        DynamicAdapt.prototype.moveBack = function (parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].insertAdjacentElement('beforebegin', element);
            } else {
                parent.insertAdjacentElement('beforeend', element);
            }
        }
        
        // Функция получения индекса внутри родителя
        DynamicAdapt.prototype.indexInParent = function (parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        
        // Функция сортировки массива по breakpoint и place 
        // по возрастанию для this.type = min
        // по убыванию для this.type = max
        DynamicAdapt.prototype.arraySort = function (arr) {
            if (this.type === "min") {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
        
                        if (a.place === "first" || b.place === "last") {
                            return -1;
                        }
        
                        if (a.place === "last" || b.place === "first") {
                            return 1;
                        }
        
                        return a.place - b.place;
                    }
        
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
        
                        if (a.place === "first" || b.place === "last") {
                            return 1;
                        }
        
                        if (a.place === "last" || b.place === "first") {
                            return -1;
                        }
        
                        return b.place - a.place;
                    }
        
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        
        const da = new DynamicAdapt("max");
        da.init();
    
    }
    function phoneMask(){
        [].forEach.call( document.querySelectorAll('.tel'), function(input) {
            var keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                var pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                var matrix = "+7 (___) ___ ____",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function(a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function(a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5)  this.value = ""
            }
        
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)
        
          });
        
    }
    phoneMask();
    dinamicAdaptive();
}

swup.on('contentReplaced', function() {
    main();
});
let documentActions = (e) =>{
    const targetElement = e.target;
    if(document.querySelector('.header')){
        let menu = document.querySelector('.menu');
        let header__logo = document.querySelector('.header__logo');
        let body = document.querySelector('.body');
        let header = document.querySelector('.header');
        let header__burger = document.querySelector('.header__burger');
        if(targetElement.closest('.header__burger')){
            targetElement.classList.toggle('_active');
            menu.classList.toggle('_active');
            header__logo.classList.toggle('_del');
            body.classList.toggle('_lock');
            if(window.innerWidth <= 468){
                header__burger.classList.add('_del');
            }
            if(header.classList.contains('_scroll')){
                header.classList.remove('_scroll');
            }
        }
        if(!targetElement.closest('.header__burger') && !targetElement.closest('.menu')){
            targetElement.classList.remove('_active');
            menu.classList.remove('_active');
            header__logo.classList.remove('_del');
            body.classList.remove('_lock');
            header__burger.classList.remove('_active');
            if(header__burger.classList.contains('_del')){
                header__burger.classList.remove('_del');
            }
            if(window.scrollY >= 69){
                header.classList.add('_scroll');
            }
        }
        if(targetElement.closest('.menu__close')){
            menu.classList.remove('_active');
            header__logo.classList.remove('_del');
            body.classList.remove('_lock');
            header__burger.classList.remove('_active');
            if(header__burger.classList.contains('_del')){
                header__burger.classList.remove('_del');
            }
            if(window.scrollY >= 69){
                header.classList.add('_scroll');
            }
        }
        if(targetElement.closest('._navlink')){
            menu.classList.remove('_active');
            header__logo.classList.remove('_del');
            body.classList.remove('_lock');
            header__burger.classList.remove('_active');
            if(header__burger.classList.contains('_del')){
                header__burger.classList.remove('_del');
            }
        }
        if(targetElement.closest('.menu__link-onmain')){
            window.scroll({
                behavior: 'smooth',
                top: 0
            })
        }
    }
    if(document.querySelector('.footer')){
        let footer__list1 = document.querySelector('[data-footacclist="1"]');
        let footer__list2 = document.querySelector('[data-footacclist="2"]');
        let footer__column__2__item__1 = document.querySelector('.footer__column-2-item-1');
        let footer__column__1__item__2 = document.querySelector('.footer__column-1-item-2');
        if(targetElement.closest('[data-footaccitem]')){
            let footacctitemId = targetElement.dataset.footaccitem;
            let footacclist = document.querySelector(`[data-footacclist='${footacctitemId}']`);
            let footer__column__item = document.querySelector(`[data-footaccbef='${footacctitemId}']`);
            footer__column__item.classList.toggle('_active');
            footacclist.classList.toggle('_active');
        }
        if(footer__list1.classList.contains('_active')){
            if(!targetElement.closest('[data-footaccitem]') && !targetElement.closest('.footer__list')){
                footer__list1.classList.remove('_active');
                footer__list2.classList.remove('_active');
                footer__column__2__item__1.classList.remove('_active');
                footer__column__1__item__2.classList.remove('_active');
            }
        }
        if(footer__list2.classList.contains('_active')){
            if(!targetElement.closest('[data-footaccitem]') && !targetElement.closest('.footer__list')){
                footer__list1.classList.remove('_active');
                footer__list2.classList.remove('_active');
                footer__column__2__item__1.classList.remove('_active');
                footer__column__1__item__2.classList.remove('_active');
            }
        }
    }
    if(document.querySelector('.advantages')){
        let activeItem = document.querySelector('._activeItem');
        if(targetElement.closest('[data-item]')){
            if(activeItem && activeItem !== targetElement){
                activeItem.classList.remove('_activeItem');
            }
            let itemId = targetElement.dataset.item;
            slider.slideTo(itemId);
        }
    }
    if(document.querySelector('.video')){
        let activeVideo = document.querySelector('._activeVideo');
        if(targetElement.closest('.video__main')){
            targetElement.classList.toggle('_activeVideo');
        }
        if(!targetElement.closest('.video__main')){
            if(activeVideo){
                activeVideo.classList.remove('_activeVideo');
            }
        }
    }
    if(document.querySelector('.question')){
        let activeQuest = document.querySelector('._activeQues');
        if(targetElement.closest('.accardion__question-item')){
            if(activeQuest && activeQuest !== targetElement){
                activeQuest.classList.remove('_activeQues');
            }
            targetElement.classList.toggle('_activeQues');
        }
        if(!targetElement.closest('.accardion__question-item')){
            if(activeQuest){
                activeQuest.classList.remove('_activeQues');
            }
        }
    }
    if(document.querySelector('.info__contacts-form')){
        if(targetElement.closest('.form__info-contacts-agreement-input-visible')){
            targetElement.classList.toggle('_active');
        }
    }
}
document.addEventListener('click', documentActions);

main();

