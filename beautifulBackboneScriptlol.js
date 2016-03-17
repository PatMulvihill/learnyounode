/*global $, _, Backbone */
var app = app || {};
app.view = app.view || {};
app.router = app.router || {};
//Not using this ATM?
//app.ajaxURL = "Documents/Head/mywebroot/";

//Use this map when setting breadcrumb text. it allows the change
//from plain non-descriptive html folder/file names to make
//them more human readable. Any additions here will be reflected
//without change to any code
app.breadcrumbsMap = {
  requirements: {
    title: 'Submission Requirements',
    href: '/#/CS471/requirements.html'
  },
  expectation: {
    title: 'Grading Policy',
    href: '/#/CS471/expectation.html'
  },
  471: {
    title: 'Home',
    href: '/#/CS471/471.html'
  },
  Calendar: {
    title: 'Calendar',
    href: '/#/CS471/Calendar.html'
  },
  '471HaskellIndex': 'Haskell',
  
  '471RuntimeIndex': {
    title: 'Language Design Issues',
    href: '/#/CS471/471RuntimeIndex.html'
  },
  'RUNTIME': {
    title: 'Runtime',
    href: '/#/CS471/471RuntimeIndex.html'
  },

}

//Define the main view here
app.PageView = Backbone.View.extend({

  //The page element gets passed into from options
  el: null,

  initialize: function(options) {
    //Save the el, and write loading text
    this.el = options.el;
    this.$el.html("Loading..");

  },
  
  //This function does the heavy lifting of the ajax call to 
  //get the actual html page
  loadPage: function(url) {
    
    //Create the template variable, and save a ref to 'this'
    var template;
    var that = this;
    $.get(url, function(data) {
      
        //Load the requested page in
        //Need to mutate the data to have line breaks in it
        //Only if the file is not an html file
        if (url.indexOf('.html') == -1) {
          data = that.insertLineBreaks(data);
        }
        
        //Use underscores templating engine to create the view
        template = _.template(data, {});
        
        //Set the html as the underscore view
        that.$el.html(template)
      })
      //When the ajax call fails..
      .fail(function() {
        
        //Load the 404 page if requested URL not found
        $.get('404.html', function(data) {
          
          //Empty breadcrumb and render 404 page
          $('.breadcrumb').empty();
          template = _.template(data, {});
          that.$el.html(template)
          
          //Assuming the 404 wont fail to laod, cause if it does
          //The problem is out of our hands
        })
      })
      //No matter whether success or fail, set window to be at top
      .always(function(){
        window.scrollTo(0, 0);
      })
  },
  
  //Update the bread crumbs at the top of the page
  renderBreadCrumbs: function(urlArr) {
    
    //Get a jquery reference to the DOM element, and empty it
    var bc = $('.breadcrumb')
    bc.empty();
    
    //for each element in the url, render a breadcrumb appended to the 
    //dom element with classname 'breadcrumb'
    _.each(urlArr, function(subPath, i) {
  
      //If looking at last index of the array, and file is html then
      //cut off the html for prettier looking naming
      if (i == urlArr.length - 1 && subPath.indexOf('.html') > -1) {
        subPath = subPath.substr(0, subPath.length - 5);
      }
      
      //Also, check here whether or not we have a more human readable
      //name for this specific subPath in the breadcrumbs Map at the top
      //of this script. If so, replace
      if (app.breadcrumbsMap[subPath]) {
        subPath = '<li> <a href="' + app.breadcrumbsMap[subPath].href + '">' + app.breadcrumbsMap[subPath].title + '</a></li>';
      }else{
        subPath = '<li>' + subPath + '</li>';
      }
      //And last but not least, append the new html string to the subPath
      bc.append(subPath);
    })
  },
  insertLineBreaks: function(data) {
    
    //Need to mutate the data to have line breaks in it
    //Only called if the file is not an html file, aka any code
    //file runs through this function
    
    //Instantiate the string that will be returned to be used as
    //HTML
    var page = '';
    
    _.each(data, function(char) {
      
      //Find the line breaks and transform them into html line breaks
      if (char == '\n') {
        char = '<br>';
      }
      
      //Append to the return string
      page += char;
    })
    
    return page;
  }

})

//This object controls what backbone does with url requests
app.MainRouter = Backbone.Router.extend({

  //Here are all the routes we have defined. Unfortuneately 
  //We cant make this any more dynamic(aka condense all five
  //into just one and split based on '/') because of the way 
  //backbone passes route arguments.
  routes: {
    ':one': 'one',
    ':one/:two': 'two',
    ':one/:two/:three': 'three',
    ':one/:two/:three/:four': 'four',
    ':one/:two/:three/:four/:five': 'five',

    //Renders the home page
    '': 'default',
  },
  
  //For each of the functions below, we first call the load page 
  //function which makes the ajax call, and secondly we pass the 
  //url subPaths as an array to the render breadcrumbs function.
  one: function(first) {
    app.View.loadPage(first);
    app.View.renderBreadCrumbs([first]);
  },
  two: function(first, second) {
    app.View.loadPage(first + '/' + second);
    app.View.renderBreadCrumbs([first, second]);
  },
  three: function(first, second, third) {
    app.View.loadPage(first + '/' + second + '/' + third);
    app.View.renderBreadCrumbs([first, second, third]);
  },
  four: function(first, second, third, fourth) {
    app.View.loadPage(first + '/' + second + '/' + third + '/' + fourth);
    app.View.renderBreadCrumbs([first, second, third, fourth]);
  },
  five: function(first, second, third, fourth, fifth) {
    app.View.loadPage(first + '/' + second + '/' + third + '/' + fourth + '/' + fifth);
    app.View.renderBreadCrumbs([first, second, third, fourth, fifth]);
  },
  
  //Don't care about path name, just render the home page
  default: function() {
    app.View.loadPage('home.html');
    app.View.renderBreadCrumbs();
  }
})

//This function runs when the DOM has completed rendering. It 
//ensures backbone doesn't try doing stuff to the el without it 
//actually being on the page yet
$(function() {

  //Instantiate our page view into the app namespace
  app.View = new app.PageView({
    el: "#pageContent"
  })
  
  //Instantiate the router also into the app namespace
  app.Router = new app.MainRouter();
  
  //Begin tracking of history, so that back/forward actions
  //in the browser work as expected
  Backbone.history.start({});
})
