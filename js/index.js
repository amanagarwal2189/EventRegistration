function getAllData(){
	var name = document.getElementById("inputName").value;
	var phonenum = document.getElementById("inputMobile").value;
	var  email = document.getElementById("inputEmail").value;
	var  id_file_name = document.getElementById("inputId").value;
	var  reg_type = document.getElementById("inputRegType").value;
	var  num_tickets = document.getElementById("inputTixNum").value;

	validateFileType(id_file_name);
    
    var obj1 = {};
    obj1["name"] = name;
    obj1["phonenum"] = phonenum ;
    obj1["email"] = email;
    obj1["file"] = id_file_name;
    obj1["reg_type"] = reg_type;
    obj1["num_tickets"] = num_tickets;	
    var formData = JSON.stringify(obj1);
    alert(formData);
}

function validateFileType(id_file_name){
	var _validFileExtensions = [".jpg", ".jpeg", ".png"];
	if (id_file_name.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (id_file_name.substr(id_file_name.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
            }
        }               
        if (!blnValid) {
            alert("Sorry, " + id_file_name + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
            return false;
        }
    }
}

