import React from "react";

function MainPage() {
    return(
        <div>
        <main className="app app-site">
            <nav className="navbar navbar-expand-lg navbar-light py-4" data-aos="fade-in">
                <div className="container">
                    <button className="hamburger hamburger-squeeze hamburger-light d-flex d-lg-none" type="button"
                            data-toggle="collapse" data-target="#navbarTogglerDemo01"
                            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="hamburger-box"><span className="hamburger-inner"></span></span></button>
                    <a className="navbar-brand ml-auto mr-0" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28"
                             viewBox="0 0 351 100">
                            <defs>
                            </defs>
                            <g fill="none" fillRule="evenodd">
                                <use className="fill-primary" xlinkHref="#a"></use>
                            </g>
                        </svg>
                    </a>
                    <div className="navbar-collapse collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item mr-lg-3 active">
                                <a className="nav-link py-2" href="#">tu powinno być logo</a>
                            </li>
                            <li className="nav-item mr-lg-3">
                                <a className="nav-link py-2" href="#">Onboarding</a>
                            </li>
                            <li className="nav-item mr-lg-3">
                                <a className="nav-link py-2" href="#">Feedback</a>
                            </li>
                            <li className="nav-item mr-lg-3">
                                <a className="nav-link py-2" href="#">Oferta</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="py-5">
                <div className="container container-fluid-xl">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6 order-md-2" data-aos="fade-left">
                            <img className="img-fluid img-float-md-6 mb-5 mb-md-0"
                                 src="../static/looper/images/illustration/launch.svg" alt=""/>
                        </div>
                        <div className="col-12 col-md-6 order-md-1" data-aos="fade-in">
                            <div className="col-fix pl-xl-3 ml-auto text-center text-sm-left">
                                <h1 className="display-4 enable-responsive-font-size mb-4"> Internetowa
                                    aplikacja <strong>ONLINE
                                        ONBOARDING</strong> już niedługo będzie dostępna! </h1>
                                <p className="lead text-muted mb-5"> Cały proces onboardingu nowego pracownika w jednym
                                    miejscu,
                                    daje możliwośc nadzorowania całęgo procesu na bierząco. Aplikacja dostępna na
                                    smartfonach, tabletach i komputerach!
                                </p><a href="#" className="btn btn-lg btn-primary d-block d-sm-inline-block
                    mr-sm-2 my-3" data-aos="zoom-in" data-aos-delay="200">Wypróbuj <i className="fa fa-angle-right
                    ml-2"/></a> <a href="#" className="btn btn-lg btn-subtle-primary d-block d-sm-inline-block my-3"
                                   target="_blank" data-aos="zoom-in" data-aos-delay="300">Dowiedz się więcej</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <div className="row text-center text-md-left">
                        <div className="col-6 col-md-3 py-4" data-aos="fade-up" data-aos-delay="0">
                            <img className="mb-4" src="../static/looper/images/illustration/lab.svg" alt="" height="72"/>
                            <h2 className="lead"> Nowoczesne podejście </h2>
                        </div>
                        <div className="col-6 col-md-3 py-4" data-aos="fade-up" data-aos-delay="100">
                            <img className="mb-4" src="../static/looper/images/illustration/easy-config.svg" alt=""
                                 height="72"/>
                            <h2 className="lead"> Prosty w obsłudze </h2>
                        </div>
                        <div className="col-6 col-md-3 py-4" data-aos="fade-up" data-aos-delay="200">
                            <img className="mb-4" src="../static/looper/images/illustration/scale.svg" alt=""
                                 height="72"/>
                            <h2 className="lead"> Skaluje się razem z twoją firmą </h2>
                        </div>
                        <div className="col-6 col-md-3 py-4" data-aos="fade-up" data-aos-delay="300">
                            <img className="mb-4" src="../static/looper/images/illustration/support.svg" alt=""
                                 height="72"/>
                            <h2 className="lead"> Wspaniałe wsparcie</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 text-center">
                            <h2> Online Onboarding </h2>
                            <p className="lead text-muted"> Dzięki naszej aplikacji przyspieszysz proces wdrażania
                                nowych pracowników
                                dzięki czemu szybciej zaczną przynosić zyski!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6" data-aos="fade-right">
                            <img className="img-fluid mb-4 mb-md-0"
                                 src="../static/looper/images/illustration/solution.svg" alt=""/>
                        </div>
                        <div className="col-12 col-md-6 text-center text-sm-left">
                            <h3 className="mb-4"> Onboarding </h3>
                            <p className="text-muted font-size-lg mb-4"> Spraw aby twoi nowi pracownicy od pierwszego
                                dnia w twojej
                                firmie czuli się jej częścią, zwiększ jakość wdrażania nowych pracowników oraz
                                przyspiesz ten proces!
                            </p><a
                            href="#" className="btn btn-subtle-primary">Dowiedz się więcej</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6 order-md-2" data-aos="fade-left">
                            <img className="img-fluid mb-4 mb-md-0"
                                 src="../static/looper/images/illustration/testimony.svg" alt=""/>
                        </div>
                        <div className="col-12 col-md-6 order-md-1 text-center text-sm-left">
                            <h3 className="mb-4"> Feedback </h3>
                            <p className="text-muted font-size-lg mb-4"> Dzięki wbudowanemu modułowi feedbacku dowiesz
                                się jak uczynić
                                proces wdrażania jeszcze lepszym! Wystarczy że dołączysz formularz feedbacku do procesu
                                onboardingu
                                aby zbierać dane które pozwolą ulepszyć proces wdrożenia nowego pracownika.
                            </p>
                            <a href="#" className="btn btn-subtle-primary">Dowiedz się więcej</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="position-relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="192" viewBox="0 0 1440 240"
                     preserveAspectRatio="none">
                    <path className="fill-light" fillRule="evenodd"
                          d="M0 240V0c19.985 5.919 41.14 11.008 63.964 14.89 40.293 6.855 82.585 9.106 125.566 9.106 74.151 0 150.382-6.697 222.166-8.012 13.766-.252 27.51-.39 41.21-.39 99.76 0 197.087 7.326 282.907 31.263C827.843 72.527 860.3 117.25 906.926 157.2c43.505 37.277 115.38 51.186 208.485 53.076 7.584.153 15.156.224 22.714.224 40.887 0 81.402-2.062 121.914-4.125 40.512-2.062 81.027-4.125 121.902-4.125 1.01 0 2.019.002 3.03.004 16.208.042 34.959.792 55.029 2.234V240H0z"></path>
                </svg>
            </section>
            <section className="position-relative pb-5 bg-light">
                <div className="sticker">
                    <div className="sticker-item sticker-top-right sticker-soften">
                        <img src="../static/looper/images/cubes.svg" alt="" data-aos="zoom-in"/>
                    </div>
                    <div className="sticker-item sticker-bottom-left sticker-soften scale-150">
                        <img src="../static/looper/images/cubes.svg" alt="" data-aos="zoom-in"/>
                    </div>
                </div>
                <div className="container position-relative">
                    <h2 className="text-center text-sm-left"> Zyskaj jeszcze więcej! </h2>
                    <p className="lead text-muted text-center text-sm-left mb-5"></p>
                    <div className="card-deck-lg">
                        <div className="card shadow" data-aos="fade-up" data-aos-delay="0">
                            <div className="card-body p-4">
                                <div className="d-sm-flex align-items-start text-center text-sm-left">
                                    <img src="../static/looper/images/illustration/rocket.svg"
                                         className="mr-sm-4 mb-3 mb-sm-0" alt="" width="72"/>
                                    <div className="flex-fill">
                                        <h5 className="mt-0"> Szybki start </h5>
                                        <p className="text-muted font-size-lg"> Dzięki intuicyjnemu interfejsowi i
                                            prostemu procesowi
                                            umieszczania informacji w formularzach onboardingowych zaczniesz szybko
                                            wdrażać nowych pracowników</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow" data-aos="fade-up" data-aos-delay="100">
                            <div className="card-body p-4">
                                <div className="d-sm-flex align-items-start text-center text-sm-left">
                                    <img src="../static/looper/images/illustration/setting.svg"
                                         className="mr-sm-4 mb-3 mb-sm-0" alt="" width="72"/>
                                    <div className="flex-fill">
                                        <h5 className="mt-0"> Wiele funkcjonalności </h5>
                                        <p className="text-muted font-size-lg"> Aplikacja daje wiele możliwości
                                            wdrożenia nowego pracownika,
                                            można stwożyć szablony indywidualne dla każdego pracownika lub szablony
                                            ogólne </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-deck-lg">
                        <div className="card shadow" data-aos="fade-up" data-aos-delay="200">
                            <div className="card-body p-4">
                                <div className="d-sm-flex align-items-start text-center text-sm-left">
                                    <img src="../static/looper/images/illustration/brain.svg"
                                         className="mr-sm-4 mb-3 mb-sm-0" alt="" width="72"/>
                                    <div className="flex-fill">
                                        <h5 className="mt-0"> Feedback </h5>
                                        <p className="text-muted font-size-lg"> Wykorzystaj feedback aby sprawić aby
                                            twój proses wdrożenia
                                            nowych pracowników był jeszcze lepszy. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow" data-aos="fade-up" data-aos-delay="300">
                            <div className="card-body p-4">
                                <div className="d-sm-flex align-items-start text-center text-sm-left">
                                    <img src="../static/looper/images/illustration/horse.svg"
                                         className="mr-sm-4 mb-3 mb-sm-0" alt="" width="72"/>
                                    <div className="flex-fill">
                                        <h5 className="mt-0"> Szybsze wdrożenie </h5>
                                        <p className="text-muted font-size-lg"> Dzięki szybkiemu wdrożeniu nowi
                                            pracownicy znacznie zwiększą
                                            swoją wydajność w pierwszym miesiącu pracy!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-deck-lg">
                        <div className="card shadow" data-aos="fade-up" data-aos-delay="400">
                            <div className="card-body p-4">
                                <div className="d-sm-flex align-items-start text-center text-sm-left">
                                    <img src="../static/looper/images/illustration/savings.svg"
                                         className="mr-sm-4 mb-3 mb-sm-0" alt="" width="72"/>
                                    <div className="flex-fill">
                                        <h5 className="mt-0"> Prosty system płatności </h5>
                                        <p className="text-muted font-size-lg"> Możliwość wybrania systemu
                                            płatności, opłata za każdego
                                            wdrożonego użytkownika lub system subskrybcyjny </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow" data-aos="fade-up" data-aos-delay="500">
                            <div className="card-body p-4">
                                <div className="d-sm-flex align-items-start text-center text-sm-left">
                                    <img src="../static/looper/images/illustration/document.svg"
                                         className="mr-sm-4 mb-3 mb-sm-0" alt="" width="72"/>
                                    <div className="flex-fill">
                                        <h5 className="mt-0"> Przesyłanie dokumentów </h5>
                                        <p className="text-muted font-size-lg"> Wszystkie dokumenty związane z
                                            wdrażanym pracownikiem w
                                            jednym miejscu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="position-relative py-5 bg-light">
                <div className="sticker">
                    <div className="sticker-item sticker-top-right sticker-soften translate-x-50">
                        <img src="../static/looper/images/bubble1.svg" alt="" data-aos="fade-left"/>
                    </div>
                </div>
                <div className="container position-relative">
                    <h2 className="text-center"> System płatności </h2>
                    <p className="lead text-muted text-center mb-5"> Wystarczy wybrać odpowiedni
                        pakiet </p>
                    <div className="row align-items-center">
                        <div className="col-12 col-md-5 offset-md-1 py-md-4 pr-md-0">
                            <div className="card font-size-lg shadow-lg" data-aos="fade-up">
                                <h5 className="card-header text-center text-success p-4 px-lg-5"> Za jednego
                                    użytkownika </h5>
                                <div className="card-body p-4 p-lg-5">
                                    <h3 className="display-3 text-center">
                                        <sup><small>zł</small></sup>49<small><small/></small>
                                    </h3>
                                    <p className="text-center text-muted mb-5"> Jeżeli nie zatrudniasz nowyh pracowników
                                        regularnie możesz wykupić potrzebną liczbę wdrożeń dla nowyh pracowników </p>
                                    <ul className="list-icons">
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> Samodzielnie dopasowane do potrzeb
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> Zakupione wdrożenia wykożystaj kiedy
                                            chcesz
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> 3
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> 4
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> 5
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> 6
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> 7
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <a href="https://themes.getbootstrap.com/product/looper-responsive-admin-template"
                                       className="card-footer-item p-4 px-lg-5">kup teraz
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 py-md-4 pl-md-0">
                            <div className="card font-size-lg card-inverse bg-primary shadow" data-aos="fade-up"
                                 data-aos-delay="200">
                                <h5 className="card-header text-center p-4 px-lg-5"> Nielimitowane </h5>
                                <div className="card-body p-4 p-lg-5">
                                    <h3 className="display-3 text-center">
                                        <sup><small>zł</small></sup>1999<small><small> </small>/miesiąc</small>
                                    </h3>
                                    <p className="text-center text-muted-light mb-5"> Miesięczna subskrybcja idealna dla
                                        film zatrudnijących co miesiąc wielu pracowników </p>
                                    <ul className="list-icons">
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> Nielimitowane liczba wdrożeń
                                            miesięcznie
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> Jedna faktura miesięcznie
                                        </li>
                                        <li className="mb-2 pl-1">
                      <span className="list-icon"><img className="mr-2" src="../static/looper/images/check.svg"
                                                       alt="" width="16"/></span> Wsparcie 7 dni w tygodniu
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <a href="https://themes.getbootstrap.com/product/looper-responsive-admin-template"
                                       className="card-footer-item text-white p-4 px-lg-5">Kup teraz</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="position-relative py-5 bg-light">
                <div className="sticker">
                    <div className="sticker-item sticker-bottom-left sticker-soften">
                        <img src="../static/looper/images/bubble2.svg" alt="" data-aos="zoom-in" data-aos-delay="200"/>
                    </div>
                </div>
                <div className="container position-relative mb-5">
                    <h2 className="text-center"> You are in a good company </h2>
                    <p className="text-center text-muted font-size-lg mb-5"> We are nothing without you! Thanks to all of you who have contributed in every update. </p>
                    <div className="row mb-6">
                        <div className="col-12 col-md-8 offset-md-2 py-3">
                            <div className="row justify-content-center text-center">
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="0">
                                    <img src="../static/looper/images/logo/airbnb.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="100">
                                    <img src="../static/looper/images/logo/amazon.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="200">
                                    <img src="../static/looper/images/logo/apple.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="300">
                                    <img src="../static/looper/images/logo/dropbox.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="400">
                                    <img src="../static/looper/images/logo/google.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="500">
                                    <img src="../static/looper/images/logo/linkedin.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="600">
                                    <img src="../static/looper/images/logo/paypal.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="700">
                                    <img src="../static/looper/images/logo/shopify.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="900">
                                    <img src="../static/looper/images/logo/sketch.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="1000">
                                    <img src="../static/looper/images/logo/slack.svg" alt="" className="img-fluid" style={{maxHeight: "32px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4 offset-lg-1 mr-md-0">
                            <div className="card shadow-none rounded-lg mb-0 mr-md-n5 mt-md-n5 scale-125" data-aos="fade-in">
                                <img className="img-fluid rounded-lg" src="../static/looper/images/illustration/happy-client.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 ml-md-0">
                            <div className="card shadow-lg rounded-lg p-4 ml-md-n5 mt-md-5" data-aos="fade-up">
                                <blockquote className="blockquote text-center border-0 p-3 p-md-4">
                                    <figure>
                                        <img className="mr-2" src="../static/looper/images/quote.svg" alt="" height="32"/>
                                    </figure>
                                    <p> Dzięki wdrożeniu nowych członków w naszej organizacji za pomocą Online Onboarding nowi
                                        człownkowie naszej organizacji szybciej zaczynają produktywną prace. Dodatkowym atutem jest
                                        feedback który otrzymujemy od każdego nowego członka organizacji i sprawiamy że proces
                                        onboardingu kolejnych osób jest coraz lepszy!

                                    </p>
                                    <footer className="blockquote-footer"> Maciej J, <cite title="Bootstrap Themes"> Bina Work</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 position-relative bg-light">
                <div className="sticker">
                    <div className="sticker-item sticker-bottom-left w-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="120" viewBox="0 0 1440 240" preserveAspectRatio="none">
                        </svg>
                    </div>
                </div>
                <div className="container">
                    <div className="card bg-success text-white position-relative overflow-hidden shadow rounded-lg p-4 mb-0" data-aos="fade-up">
                        <div className="sticker">
                            <div className="sticker-item sticker-middle-left">
                                <img className="flip-y" src="../static/looper/images/bubble4.svg" alt=""/>
                            </div>
                        </div>
                        <div className="card-body d-md-flex justify-content-between align-items-center text-center position-relative">
                            <h3 className="font-weight-normal mb-3 mb-md-0 mr-md-3"> Got a question about Looper? </h3><a className="btn btn-lg btn-primary shadow" href="mailto:onlineonboardingnet@gmail.com">Contact us <i className="fa fa-angle-right ml-2"></i></a>
                        </div>
                    </div>
                </div>
                <div className="card bg-success text-white position-relative overflow-hidden shadow rounded-lg p-4 mb-0" data-aos="fade-up"/>
                <div className="sticker">
                    <div className="sticker-item sticker-middle-left">
                        <img className="flip-y" src="../static/looper/images/bubble4.svg" alt=""/>
                    </div>
                </div>
                <div className="card-body d-md-flex justify-content-between align-items-center text-center position-relative">
                    <h3 className="font-weight-normal mb-3 mb-md-0 mr-md-3"> Got a question about Looper? </h3><a className="btn btn-lg btn-primary shadow" href="mailto:onlineonboardingnet@gmail.com">Contact us <i className="fa fa-angle-right ml-2"></i></a>
                </div>
            </section>
            <section className="py-5 bg-black text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 351 100">
                                <defs>
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <use className="fill-primary" xlinkHref="#a"></use>
                                </g>
                            </svg>
                            <p className="text-muted mb-2"> The theme for your project. </p>
                            <address className="text-muted">
                                <abbr title="US phone code">+1</abbr> (234) 567-8910 </address>
                            <ul className="list-inline mb-5 mb-md-0">
                                <li className="list-inline-item mr-3" data-aos="fade-in" data-aos-delay="0">
                                    <a href="#" className="text-muted text-decoration-none" title="twitter"><img className="grayscale" src="../static/looper/images/logo/twitter.svg" alt="" width="24"/></a>
                                </li>
                                <li className="list-inline-item mr-3" data-aos="fade-in" data-aos-delay="100">
                                    <a href="#" className="text-muted text-decoration-none" title="instagram"><img className="grayscale" src="../static/looper/images/logo/instagram.svg" alt="" width="24"/></a>
                                </li>
                                <li className="list-inline-item mr-3" data-aos="fade-in" data-aos-delay="200">
                                    <a href="#" className="text-muted text-decoration-none" title="dribbble"><img className="grayscale" src="../static/looper/images/logo/dribbble.svg" alt="" width="24"/></a>
                                </li>
                                <li className="list-inline-item mr-3" data-aos="fade-in" data-aos-delay="300">
                                    <a href="#" className="text-muted text-decoration-none" title="medium"><img className="grayscale" src="../static/looper/images/logo/medium.svg" alt="" width="24"/></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2 mb-3 mb-md-0">
                            <h6 className="mb-4"> Company </h6>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <a href="#" className="text-muted">About Us</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Blog</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Knowledge Base</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Press</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2 mb-3 mb-md-0">
                            <h6 className="mb-4"> Product </h6>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <a href="#" className="text-muted">SaaS</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Project Management</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">eCommerce</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">CRM</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">CMS</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2 mb-3 mb-md-0">
                            <h6 className="mb-4"> Help </h6>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Help Center</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Documentation</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Technical Support</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">FAQ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2 mb-3 mb-md-0">
                            <h6 className="mb-4"> Legal </h6>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Privacy Policy</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Terms of Service</a>
                                </li>
                                <li className="mb-3">
                                    <a href="#" className="text-muted">Cookies Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-muted text-center mt-5"> &copoper, Inc. All rights reserved. </p>
                </div>
            </section>
        </main>
        <script src="../static/looper/vendor/jquery/jquery.min.js"/>
        <script src="../static/looper/vendor/bootstrap/js/popper.min.js"/>
        <script src="../static/looper/vendor/bootstrap/js/bootstrap.min.js"/>
        <script src="../static/looper/vendor/aos/aos.js"/>
        <script src="../static/looper/javascript/theme.min.js"/>
        </div>
        )
    }
export default MainPage;
