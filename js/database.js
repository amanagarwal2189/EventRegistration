var articlesDB = (function() {
  	var aDB = {};
  	var datastore = null;
	aDB.open = function(callback) {
 	 	var request = indexedDB.open('articles', 1);
 	 	request.onupgradeneeded = function(e) {
    		var db = e.target.result;
    		e.target.transaction.onerror = aDB.onerror;
    		if (db.objectStoreNames.contains('article')) {
      			db.deleteObjectStore('article');
    		}
    		var store = db.createObjectStore('article', {keyPath: 'id'});
  		};
  		request.onsuccess = function(e) {
  			datastore = e.target.result;
    		callback();
  		};
  	request.onerror = aDB.onerror;
	};

	aDB.fetchTodos = function(callback) {
  		var db = datastore;
  		var transaction = db.transaction(['article'], 'readwrite');
  		var objStore = transaction.objectStore('article');
  		var keyRange = IDBKeyRange.lowerBound(0);
  		var cursorRequest = objStore.openCursor(keyRange);
 		var articles = [];
  		transaction.oncomplete = function(e) {
    		callback(articles);
  		};
  		cursorRequest.onsuccess = function(e) {
   			var result = e.target.result;
    		if (!!result == false) {
    		  return;
    		}
   		 	articles.push(result.value);
    		result.continue();
  		};
 		cursorRequest.onerror = aDB.onerror;
	};


	/**
	* Create a new article item.
 	*/
	aDB.createTodo = function(dataOb, callback) {
  		var db = datastore;
  		var transaction = db.transaction(['article'], 'readwrite');
  		var objStore = transaction.objectStore('article');
  		var article = {
    		'text': dataOb,
    		'id': dataOb.id
  		};
  		var request = objStore.put(article);
  		request.onsuccess = function(e) {
    		callback(article);
  		};
 		request.onerror = aDB.onerror;
	};
  	return aDB;
}());