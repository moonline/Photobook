var app;
(function (app) {
    var domain;
    (function (domain) {
        var model;
        (function (model) {
            'use strict';
        })(model = domain.model || (domain.model = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
/// <reference path="../../Domain/Model/Element.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var model;
        (function (model) {
            'use strict';
            var Image = (function () {
                function Image(path) {
                    this.path = path;
                    this.properties = {
                        display: "horizontal",
                        position: "center",
                        verticalStyle: "standard"
                    };
                    this.caption = null;
                }
                Image.prototype.importFromObject = function (image) {
                    this.path = image.path;
                    this.properties = image.properties;
                    // set if not set -> backward compatibility
                    if (!this.properties['display']) {
                        this.properties['display'] = "horizontal";
                    }
                    if (!this.properties['position']) {
                        this.properties['position'] = "center";
                    }
                    if (!this.properties['verticalStyle']) {
                        this.properties['verticalStyle'] = "standard";
                    }
                    this.caption = image.caption;
                };
                Image.prototype.setCaption = function (caption) {
                    this.caption = caption;
                };
                return Image;
            })();
            model.Image = Image;
        })(model = domain.model || (domain.model = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
/// <reference path="../../Domain/Model/Element.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var model;
        (function (model) {
            'use strict';
            var Title = (function () {
                function Title(title) {
                    if (title === void 0) { title = "New Title"; }
                    this.value = title;
                    this.properties = {
                        type: "standard",
                        size: "normal",
                        width: 9,
                        top: 7,
                        left: 9
                    };
                }
                Title.prototype.importFromObject = function (title) {
                    this.value = title.value;
                    this.properties = title.properties;
                };
                return Title;
            })();
            model.Title = Title;
        })(model = domain.model || (domain.model = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
var app;
(function (app) {
    var domain;
    (function (domain) {
        var model;
        (function (model) {
            'use strict';
            (function (RelativePosition) {
                // relativ position to the current element
                RelativePosition[RelativePosition["beforeLast"] = -2] = "beforeLast";
                RelativePosition[RelativePosition["previous"] = -1] = "previous";
                RelativePosition[RelativePosition["current"] = 0] = "current";
                RelativePosition[RelativePosition["next"] = 1] = "next";
                RelativePosition[RelativePosition["afterNext"] = 2] = "afterNext";
            })(model.RelativePosition || (model.RelativePosition = {}));
            var RelativePosition = model.RelativePosition;
        })(model = domain.model || (domain.model = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
/// <reference path="../../Domain/Model/Page.ts"/>
/// <reference path="../../Domain/Model/RelativePosition.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var model;
        (function (model) {
            'use strict';
            var PhotoBook = (function () {
                function PhotoBook(title) {
                    if (title === void 0) { title = null; }
                    this.title = title;
                    this.pages = [];
                }
                PhotoBook.prototype.addPage = function (page, position) {
                    if (position === void 0) { position = 0; }
                    page.setPhotobook(this);
                    this.pages.splice(position, 0, page);
                };
                PhotoBook.prototype.getNeighborPage = function (page, relativePosition) {
                    if (relativePosition === void 0) { relativePosition = model.RelativePosition.next; }
                    var currentPosition = this.pages.indexOf(page);
                    var neighborPosition = currentPosition + relativePosition;
                    if (currentPosition >= 0 && (typeof this.pages[neighborPosition] !== 'undefined')) {
                        return this.pages[neighborPosition];
                    }
                    else {
                        return null;
                    }
                };
                PhotoBook.prototype.createPageAfter = function (page, numberOfLines) {
                    if (numberOfLines === void 0) { numberOfLines = 2; }
                    var pos = this.pages.indexOf(page);
                    if (pos >= 0) {
                        this.createPage(numberOfLines, pos + 1);
                    }
                };
                PhotoBook.prototype.createPage = function (numberOfLines, position) {
                    if (numberOfLines === void 0) { numberOfLines = 2; }
                    if (position === void 0) { position = 0; }
                    var page = new model.Page(numberOfLines);
                    page.setPhotobook(this);
                    this.addPage(page, position);
                };
                PhotoBook.prototype.removePage = function (page) {
                    var position = this.pages.indexOf(page);
                    if (position >= 0) {
                        this.pages.splice(position, 1);
                    }
                };
                PhotoBook.prototype.movePage = function (page, amount) {
                    if (amount === void 0) { amount = 1; }
                    var from = this.pages.indexOf(page);
                    var to = from + amount;
                    if (from >= 0 && to >= 0 && to < this.pages.length) {
                        this.pages.splice(to, 0, this.pages.splice(from, 1)[0]);
                    }
                };
                PhotoBook.prototype.importFromObject = function (photobook) {
                    this.title = photobook.title;
                    for (var i in photobook.pages) {
                        var newPage = new model.Page(photobook.pages[i].numberOfLines);
                        newPage.importFromObject(photobook.pages[i]);
                        newPage.setPhotobook(this);
                        this.pages.push(newPage);
                    }
                };
                return PhotoBook;
            })();
            model.PhotoBook = PhotoBook;
        })(model = domain.model || (domain.model = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
/// <reference path="../../Domain/Model/Image.ts"/>
/// <reference path="../../Domain/Model/Title.ts"/>
/// <reference path="../../Domain/Model/PhotoBook.ts"/>
/// <reference path="../../Domain/Model/RelativePosition.ts"/>
/// <reference path="../../Domain/Model/Element.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var model;
        (function (model) {
            'use strict';
            var Page = (function () {
                function Page(sections) {
                    if (sections === void 0) { sections = 2; }
                    this.images = [];
                    this.titles = [];
                    this.parentPhotoBook = null;
                    this.properties = {
                        layout: "standard",
                        sections: sections
                    };
                }
                Page.prototype.setPhotobook = function (photoBook) {
                    this.parentPhotoBook = photoBook;
                };
                Page.prototype.importFromObject = function (page) {
                    // for backward compatibility: import numberOfLines property from attribute
                    this.properties = page.properties || { layout: "standard", sections: page.numberOfLines };
                    for (var i in page.images) {
                        var newImage = new model.Image(page.images[i].path);
                        newImage.importFromObject(page.images[i]);
                        this.images.push(newImage);
                    }
                    for (var j in page.titles) {
                        var newTitle = new model.Title();
                        newTitle.importFromObject(page.titles[j]);
                        this.titles.push(newTitle);
                    }
                };
                Page.prototype.addImage = function (image) {
                    this.images.push(image);
                };
                Page.prototype.insertImage = function (image) {
                    this.images.unshift(image);
                };
                Page.prototype.addImagePaths = function (pathList) {
                    var paths = [];
                    var imagePaths = pathList.split("\n");
                    for (var i in imagePaths) {
                        if (paths.indexOf(imagePaths[i]) < 0 && imagePaths[i].length > 1) {
                            paths.push(imagePaths[i]);
                            this.createImage(imagePaths[i]);
                        }
                    }
                };
                Page.prototype.createImage = function (path) {
                    if (path === void 0) { path = prompt('Image path'); }
                    if (path && path.length > 1) {
                        this.images.push(new model.Image(path));
                    }
                };
                Page.prototype.removeImage = function (image) {
                    var position = this.images.indexOf(image);
                    if (position >= 0) {
                        this.images.splice(position, 1);
                    }
                };
                Page.prototype.moveImage = function (image, amount) {
                    if (amount === void 0) { amount = 1; }
                    var from = this.images.indexOf(image);
                    var to = from + amount;
                    if (from >= 0) {
                        if (to < 0) {
                            this.parentPhotoBook.getNeighborPage(this, model.RelativePosition.previous).addImage(image);
                            this.images.splice(from, 1);
                        }
                        else if (to >= this.images.length) {
                            this.parentPhotoBook.getNeighborPage(this, model.RelativePosition.next).insertImage(image);
                            this.images.splice(from, 1);
                        }
                        else {
                            this.images.splice(to, 0, this.images.splice(from, 1)[0]);
                        }
                    }
                };
                Page.prototype.createTitle = function (title) {
                    if (title === void 0) { title = ""; }
                    this.titles.push(new model.Title(title));
                };
                Page.prototype.removeTitle = function (title) {
                    var position = this.titles.indexOf(title);
                    if (position >= 0) {
                        this.titles.splice(position, 1);
                    }
                };
                return Page;
            })();
            model.Page = Page;
        })(model = domain.model || (domain.model = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
var app;
(function (app) {
    var service;
    (function (service) {
        var FileService;
        (function (FileService) {
            'use strict';
            /**
             * read file on harddisk
             *
             * @param file: file path
             * @param callback: function to call on success
             */
            function readFile(file, callback) {
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        callback(event.target.result);
                    };
                    reader.readAsText(file);
                }
            }
            FileService.readFile = readFile;
            /**
             * rad files from harddisk
             *
             * @param files
             * @param callback
             */
            function readFiles(files, callback) {
                var fileContents = [];
                for (var index = 0; index < files.length; index++) {
                    var file = files[index];
                    if (file) {
                        var reader = new FileReader();
                        (function (i) {
                            reader.onload = function (event) {
                                fileContents.push(event.target.result);
                                if (i == (files.length - 1)) {
                                    callback(fileContents);
                                }
                            };
                        })(index);
                        reader.readAsText(file);
                    }
                }
            }
            FileService.readFiles = readFiles;
        })(FileService = service.FileService || (service.FileService = {}));
    })(service = app.service || (app.service = {}));
})(app || (app = {}));
var configuration;
(function (configuration) {
    configuration.LayoutConfiguration = window['configuration'].layoutConfiguration || {};
})(configuration || (configuration = {}));
/// <reference path="../Domain/Model/Page.ts"/>
/// <reference path="../Domain/Model/Image.ts"/>
/// <reference path="../Domain/Model/Title.ts"/>
/// <reference path="../Domain/Model/PhotoBook.ts"/>
/// <reference path="../Domain/Model/Element.ts"/>
/// <reference path="../Service/FileService.ts"/>
/// <reference path="../../Resources/Libraries/FileSaver/FileSaver.d.ts"/>
/// <reference path="../../Configuration/LayoutConfiguration.ts"/>
var app;
(function (app) {
    var application;
    (function (application) {
        'use strict';
        var ImageController = (function () {
            function ImageController($scope, $location) {
                this.scope = $scope;
                this.scope.currentElement = null;
                this.scope.currentPage = null;
                this.scope.getTypeName = this.getTypeName.bind(this);
                this.scope.setCurrentElement = this.setCurrentElement.bind(this);
                this.scope.min = this.min.bind(this);
                this.scope.isGroupStartPage = this.isGroupStartPage.bind(this);
                this.scope.getGroupEndPage = this.getGroupEndPage.bind(this);
                this.scope.setVisiblePagesStart = this.setVisiblePagesStart.bind(this);
                this.scope.isPageInGroup = this.isPageInGroup.bind(this);
                this.scope.getNumberList = this.getNumberList.bind(this);
                this.scope.save = this.save.bind(this);
                this.scope.loadFile = this.loadFile.bind(this);
                this.scope.title = "Image Manager";
                this.scope.photoBook = new app.domain.model.PhotoBook();
                this.scope.pages = [];
                this.scope.availableLayouts = Object.keys(configuration.LayoutConfiguration.layouts);
                this.scope.layouts = configuration.LayoutConfiguration.layouts;
                this.scope.pagesPerGroup = 16;
                this.scope.numberOfTitlePages = 0;
                this.scope.visiblePagesStart = 0;
                this.scope.imageQuality = 500;
                window['currentElement'] = this.scope.currentElement;
                // prevent user from closing the browser accidentially
                window.onbeforeunload = function () { return true; };
            }
            // TODO: improove
            ImageController.prototype.getTypeName = function (element) {
                if (element instanceof app.domain.model.Page) {
                    return 'Page';
                }
                if (element instanceof app.domain.model.Image) {
                    return 'Image';
                }
                if (element instanceof app.domain.model.Title) {
                    return 'Title';
                }
                if (element instanceof app.domain.model.PhotoBook) {
                    return 'PhotoBook';
                }
                return null;
            };
            ImageController.prototype.setCurrentElement = function (element, page) {
                this.scope.currentElement = element;
                this.scope.currentPage = page;
            };
            ImageController.prototype.min = function (num1, num2) {
                return Math.min(num1, num2);
            };
            ImageController.prototype.isGroupStartPage = function (page) {
                return page == 0 || (page - this.scope.numberOfTitlePages) % this.scope.pagesPerGroup == 0;
            };
            ImageController.prototype.getGroupEndPage = function (groupStartPage) {
                if (groupStartPage > this.scope.numberOfTitlePages - 1) {
                    return groupStartPage + this.scope.pagesPerGroup - 1;
                }
                else {
                    return this.scope.numberOfTitlePages - 1;
                }
            };
            ImageController.prototype.setVisiblePagesStart = function (startPage) {
                this.scope.visiblePagesStart = startPage;
            };
            ImageController.prototype.isPageInGroup = function (page) {
                return page >= this.scope.visiblePagesStart && page <= this.getGroupEndPage(this.scope.visiblePagesStart);
            };
            ImageController.prototype.getNumberList = function (start, end, step) {
                if (start === void 0) { start = 0; }
                if (end === void 0) { end = 10; }
                if (step === void 0) { step = 1; }
                var numbers = [];
                for (var i = start; i <= end; i += step) {
                    numbers.push(i);
                }
                return numbers;
            };
            ImageController.prototype.save = function () {
                var scope = this.scope;
                while (!this.scope.photoBook.title || this.scope.photoBook.title == "") {
                    this.scope.photoBook.title = prompt("Please enter the title of your photobook");
                }
                var serializedObjects = [];
                var blob = new Blob([JSON.stringify(scope.photoBook, function (key, value) {
                        // don't serialize parent relations of pages -> cyclic
                        if (key == "parentPhotoBook") {
                            return undefined;
                        }
                        else
                            return value;
                    })], { type: 'application/json' });
                var fileSaver = saveAs(blob, this.scope.photoBook.title.replace(" ", "-") + ".json");
            };
            /**
             * Load content of a file
             *
             * @param files list of files from input type file
             */
            ImageController.prototype.loadFile = function (files) {
                var scope = this.scope;
                app.service.FileService.readFile(files[0], function (fileContent) {
                    var photobook = new app.domain.model.PhotoBook();
                    photobook.importFromObject(JSON.parse(fileContent));
                    scope.photoBook = photobook;
                    this.setCurrentElement(photobook.pages[0], photobook.pages[0]);
                    scope.$apply();
                }.bind(this));
            };
            return ImageController;
        })();
        application.ImageController = ImageController;
    })(application = app.application || (app.application = {}));
})(app || (app = {}));
var app;
(function (app) {
    var service;
    (function (service) {
        var PPIService;
        (function (PPIService) {
            'use strict';
            function calcPPI() {
                if (!(PPIService.ppi > 0)) {
                    var element = document.createElement('div');
                    element.setAttribute('style', 'display: block; width: 1cm!important; padding: 0; margin: 0;');
                    document.getElementsByTagName('body')[0].appendChild(element);
                    PPIService.ppi = element['offsetWidth'];
                }
                return PPIService.ppi;
            }
            PPIService.calcPPI = calcPPI;
        })(PPIService = service.PPIService || (service.PPIService = {}));
    })(service = app.service || (app.service = {}));
})(app || (app = {}));
/// <reference path="../Application/ImageController.ts"/>
/// <reference path="../Service/PPIService.ts"/>
var app;
(function (app) {
    var mod;
    (function (mod) {
        'use strict';
        var MainModule = (function () {
            function MainModule(angular, name) {
                this.module = angular.module(name, ['ngRoute']);
                this.configureModule();
                this.addDirectives();
                this.addControllers();
                this.addServices();
            }
            MainModule.prototype.configureModule = function () {
                this.module.config(function ($routeProvider) {
                    $routeProvider.when('/', {
                        templateUrl: './Resources/Views/imageView.html',
                        controller: 'app.application.ImageController'
                    });
                    $routeProvider.otherwise({
                        redirectTo: '/'
                    });
                });
            };
            MainModule.prototype.addControllers = function () {
                this.module.controller('imageController', ['$scope', '$location', app.application.ImageController]);
            };
            MainModule.prototype.addServices = function () { };
            MainModule.prototype.addDirectives = function () {
                this.module.directive('contenteditable', function () {
                    return {
                        require: 'ngModel',
                        link: function (scope, element, attrs, ctrl) {
                            // view -> model
                            element.bind('blur', function () {
                                scope.$apply(function () {
                                    ctrl.$setViewValue(element.html());
                                });
                            });
                            // model -> view
                            ctrl.$render = function () {
                                element.html(ctrl.$viewValue);
                            };
                            // load init value from DOM
                            ctrl.$render();
                        }
                    };
                });
                /**
                 * Dragpoint directive
                 *
                 * @desc Stores the moved distance in cm to the goive properties
                 *
                 * @example:
                 * <span data-dragpoint="true" data-pos-left="title.left"  data-pos-top="title.top">move</span>
                 */
                this.module.directive('dragpoint', function ($document, $parse) {
                    return function (scope, element, attrs) {
                        var startX = 0, startY = 0;
                        var pxPerCm = app.service.PPIService.calcPPI();
                        element.on('mousedown', function (event) {
                            // Prevent default dragging of selected content
                            event.preventDefault();
                            startX = event.pageX;
                            startY = event.pageY;
                            $document.on('mousemove', mousemove);
                            $document.on('mouseup', mouseup);
                        });
                        function mousemove(event) {
                            scope.$apply(function () {
                                var posTop = parseFloat($parse(attrs.posTop)(scope));
                                var posLeft = parseFloat($parse(attrs.posLeft)(scope));
                                var adjustY = (event.pageY - startY) / pxPerCm;
                                var adjustX = (event.pageX - startX) / pxPerCm;
                                $parse(attrs.posTop).assign(scope, Math.round((adjustY + posTop) * 10) / 10);
                                $parse(attrs.posLeft).assign(scope, Math.round((adjustX + posLeft) * 10) / 10);
                                startX = event.pageX;
                                startY = event.pageY;
                            });
                        }
                        function mouseup() {
                            $document.unbind('mousemove', mousemove);
                            $document.unbind('mouseup', mouseup);
                        }
                    };
                });
                this.module.directive('ngChange', function () {
                    return {
                        //restrict: 'A',
                        scope: { 'ngChange': '=' },
                        link: function (scope, elm, attrs) {
                            scope.$watch('onChange', function (nVal) { elm.val(nVal); });
                            elm.bind('blur', function () {
                                var currentValue = elm.val();
                                if (scope.onChange !== currentValue) {
                                    scope.$apply(function () {
                                        scope.onChange = currentValue;
                                    });
                                }
                            });
                        }
                    };
                });
                /**
                 * data-ng-input directive
                 *
                 * @example
                 * <textarea data-ng-input="true" data-callback="page.addImagePaths(value)"></textarea>
                 *
                 * 'value' is the placeholder used to insert the element value
                 */
                this.module.directive('ngInput', function ($document, $parse) {
                    return {
                        scope: {
                            callback: '&callback'
                        },
                        restrict: 'A',
                        link: function (scope, elements, attrs) {
                            var element = elements[0];
                            element.addEventListener('input', function (event) {
                                var callback = $parse(scope.callback);
                                scope.$apply(function () {
                                    if (element.value && (element.value != "")) {
                                        callback({ value: element.value }, scope);
                                    }
                                });
                                element.value = "";
                            });
                        }
                    };
                });
            };
            Object.defineProperty(MainModule.prototype, "app", {
                get: function () {
                    return this.module;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MainModule.prototype, "name", {
                get: function () {
                    return this.module.name;
                },
                enumerable: true,
                configurable: true
            });
            return MainModule;
        })();
        mod.MainModule = MainModule;
    })(mod = app.mod || (app.mod = {}));
})(app || (app = {}));
/// <reference path='./Resources/Libraries/AngularJS/angular.d.ts' />
/// <reference path='./Classes/Module/MainModule.ts' />
var app;
(function (app) {
    'use strict';
    var mainModule = new app.mod.MainModule(angular, "MainModule");
    angular.bootstrap(document, [mainModule.name]);
})(app || (app = {}));
