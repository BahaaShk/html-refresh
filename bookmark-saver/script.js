const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks)

addBookmarkBtn.addEventListener("click", function(){
const name = bookmarkNameInput.value.trim()
const url = bookmarkUrlInput.value.trim()

if(!url.startsWith("http://") && !url.startsWith("https://")){
  alert("Please make sure the linkk provided starts with http:// or https://")
  return
}

addBookmark(name,url)
saveBookmark(name,url)
bookmarkNameInput.value = ''
bookmarkUrlInput.value = ''
})

function addBookmark(name,url) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = url
  link.textContent = name
  link.target = "_blank"

  const removeButton = document.createElement("button")
  removeButton.textContent = "Remove"
  removeButton.addEventListener("click", function () {
    bookmarkList.removeChild(li)
    removeBookmarkFromStorage(name,url)
  });
  li.appendChild(link)
  li.appendChild(removeButton)
  bookmarkList.appendChild(li)
}


function getBookmarksFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks")
}

function savedBookmark(){
  
}

function loadBookmarks(){

}