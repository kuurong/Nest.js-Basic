'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nene documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' :
                                            'id="xs-controllers-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' :
                                        'id="xs-injectables-links-module-AppModule-d24f42bf655b459eac728bbc7999be6c79b65b3877b1b552a8f43af44447ef2da73419c6911d03f3382c47004b4ed9ebb20b8ccbf9a222b76269ea9c802bdcf7"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' :
                                            'id="xs-controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' :
                                        'id="xs-injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' :
                                            'id="xs-controllers-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' :
                                        'id="xs-injectables-links-module-PostsModule-d19cfeeffd863d4a1c110d053b16de3d9fb090c99fb1b36e6f000a15cd2a8d2d165f4e78ae588ea64508dfaa7a81c01f96063c11cb752e1d54a461c8a1dbf546"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' :
                                            'id="xs-controllers-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' :
                                        'id="xs-injectables-links-module-UsersModule-95a71c6b88452afff324605ae8328738acc172265eaa06ebd1cf9e9d29e52c66910d1a72baac86b625ad34808cb5e20c55f4e60f2cae954ac9dd5e6bffcfdf3f"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});