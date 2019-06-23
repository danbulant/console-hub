//Frontend renderer process javascript file for filesystem
function refreshFiles(){
  if(files == null){
    return;
  }
  var shown = [];
  files.foreach((item, index) => {
    shown[index] = document.createElement('li');
    $("#files-list").append(shown[index]);
    shown[index].id = "file-" + index;
    $("#file-" + index).html(item);
  });
}
