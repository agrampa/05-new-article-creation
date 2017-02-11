'use strict';

var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#article-preview').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.initNewArticlePage = function() {
  // DONE: Ensure the main .tab-content area is revealed. We might add more tabs later.
  $('.tab-content').show();

  // DONE: The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we have data to export.
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });

  // TODO: Add an event handler to update the preview and the export field if any inputs change.
  $('#new-form').on('change', articleView.create);
    //update the preview
    
    //update the export field
    
    //refer down to the articleView.create() method first, then update here
};

articleView.create = function() {
  // DONE: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  var article;
  $('#article-preview').empty();

  // DONE: Instantiate an article based on what's in the form fields:
  article = new Article({  //calling the constructor so we don't need "this."
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    title: $('#article-title').val(),
    category: $('#article-category').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? new Date() : null
      //ternary operator: condition ? iftrue : else;
      // .length will be truthy when the box is checked, so it will set a new Date, but if it is not checked, the value will be null and it will behave falsey and the value will be set to null, meaning it has not yet been published 
  });

  // DONE: Use our interface to the Handblebars template to put this new article into the DOM:
  $('#article-preview').append(article.toHtml());

  // DONE: Activate the highlighting of any code blocks:
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);   //from the highlight.pack.js site
  });

  // DONE: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  $('#export-field').show();
  $('#article.json').val(JSON.stringify(article) + ',');  //use .val because it is an input, .val can be a setter(with content) or a getter(when empty)
  //the comma will separate it from the next object when pasted into the object!!
};


articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
