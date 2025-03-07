function readVars(target) {
    H = 0.95;
    switch (target) {
        case 'Human':
            H = 0.95;
            break;
        case 'Vehicle':
            H = 2.3;
            break;
        case 'Tank':
            H = 5;
            break;
        case 'RIB':
            H = 3.25;
            break;
        case 'Vessel':
            H = 7.75;
            break;
        case 'Warship':
            H = 65;
            break;
        case 'Drone':
            H = 0.5;
            break;
        case 'Chopper':
            H = 6;
            break;
        case 'Airbus':
            H = 10.5;
            break;
        case 'Custom':
            H = parseFloat(Math.sqrt(document.getElementById('CustomWidth').value * document.getElementById('CustomHeight').value));
            break;
    }

    return H;
}

function readSize(target) {
    dim = '(1.8m x 0.5m)';
    switch (target) {
        case 'Human':
            dim = '(1.8m x 0.5m)';
            break;
        case 'Vehicle':
            dim = '(2.3m x 2.3m)';
            break;
        case 'Tank':
            dim = '(5m x 5m)';
            break;
        case 'RIB':
            dim = '(5m x 4m)';
            break;
        case 'Vessel':
            dim = '(15m X 4m)';
            break;
        case 'Warship':
            dim = '(190m x 25m)';
            break;
        case 'Drone':
            dim = '(0.5m x 0.5m)';
            break;
        case 'Chopper':
            dim = '(10m x 3.6m)';
            break;
        case 'Airbus':
            dim = '(30m x3.6m)';
            break;
        case 'Custom':
            dim = '(' + document.getElementById('CustomWidth').value + 'm x' + document.getElementById('CustomHeight').value + 'm)';
            break;
    }

    return dim;
}

function readDRIvars(imageQuality) {
    D = 1.5;
    R = 6;
    I = 12;
    switch (imageQuality) {
        case '50':
            {
                D = 1.5,
                R = 6,
                I = 12;
            }
            break;
        case '70':
            {
                D = 1.88,
                R = 7.5,
                I = 15;
            }
            break;
        case '90':
            {
                D = 2.68,
                R = 10.74,
                I = 21.4;
            }
            break;
        case 'Custom':
            {
                D = 5.4,
                R = 5.7,
                I = 11.4;
            }
            break;
    }
    return [D, R, I];
}


function getPitchValue() {
    var ele = document.getElementsByName('pitch');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value;
    }
}

function setCustomValue() {
    document.getElementById("CustomP").value = document.getElementById('CustomPitch').value;
    document.getElementById("CustomF").value = document.getElementById('CustomFocalLength').value;

}

function getFocalLengths() {
    var checkboxes1 = document.getElementsByName('focalLength');
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes1.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes1[i].checked) {
            //var a = parseInt(checkboxes1[i].value);
            checkboxesChecked.push(checkboxes1[i].value);
        }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function getTargets() {
    var checkboxes = document.getElementsByName('target');
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function getDetectionProbability() {
    var ele = document.getElementsByName('probability');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value;
    }
}

function getImageResolutionV() {
    var ele = document.getElementsByName('imageResolution');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].id;
    }
}

function getImageResolutionH() {
    var ele = document.getElementsByName('imageResolution');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value;
    }
}

function changeText() {
    document.getElementById('table1').innerHTML = '<table id="fovTable"><tr id ="focallengthsT"><th>Focal Length (mm)</th></tr><tr id ="fovT"><td>Fov (degree)</td></tr><tr id = "ifovT"><td>Ifov (mrad)</td></tr></table>';
}

function calculateFov() {
    setCustomValue();
    var p = parseInt(getPitchValue());
    var focalLengths = getFocalLengths();
    resH = parseInt(getImageResolutionH());
    resV = parseInt(getImageResolutionV());
    changeText();
    for (l = 0; l < focalLengths.length; l++) {
        f = parseInt(focalLengths[l])
        //2*ATAN(C4*C5/1000)/(2*C3))*360/(2*PI()
        fovH = 2 * Math.atan((p * resH / 1000) / (2 * f)) * 360 / (2 * Math.PI);
        fovV = 2 * Math.atan((p * resV / 1000) / (2 * f)) * 360 / (2 * Math.PI);
        ifov = p / f;
        var parenttb1 = document.getElementById("focallengthsT");
        var newe1 = document.createElement('th');
        newe1.innerHTML = f + "mm";
        parenttb1.appendChild(newe1);
        var parenttb2 = document.getElementById("fovT");
        var newe2 = document.createElement('td');
        newe2.innerHTML = fovH.toFixed(2) + "° x " + fovV.toFixed(2) + "°";
        parenttb2.appendChild(newe2);
        var parenttb3 = document.getElementById("ifovT");
        var newe3 = document.createElement('td');
        newe3.innerHTML = ifov.toFixed(2) + " mrad";
        parenttb3.appendChild(newe3);

    }

}

function changeNote(probability) {
    $("#noteS").empty();
    var ulist2 = document.createElement("ul");
    ulist2.style = "list-style-type:none;";
    ulist2.id = "noteUL";
    document.getElementById("noteS").appendChild(ulist2);
    document.getElementById("noteUL").insertAdjacentHTML("beforeend", "<br/><br/>");
    var val = readDRIvars(probability);
    var node1 = document.createElement("LI");
    node1.id = "noteLi";
    document.getElementById("noteUL").appendChild(node1);
}

function addElement(d, r, i) {
    // create a new div element
    var newDiv = document.createElement("div");
    // and give it some content
    var newContent = document.createTextNode("Hi there and greetings!d ::::::" + d.toString() + ",r::::" + r.toString() + ",i::::" + i.toString() + ";");
    // add the text node to the newly created div
    newDiv.className = newContent;
    document.getElementById('results').appendChild(newDiv);
}

function calculateDRI() {

    setCustomValue();
    $("#tgts").empty();
    // $('#human, #vehicle, #tank, #boat,#ship , #warship ,#drone, #jet , #airbus , #custom ').hide();
    //$('#tgts').show();
    var p = parseInt(getPitchValue());
    var focalLengths = getFocalLengths();
    if (focalLengths == null) {
        alert('Error: Please select atleast one from lens focalLengths');
        return true;
    }
    var targets = getTargets();
    if (targets == null) {
        alert('Error: Please select atleast one from Targets');
        return true;
    }
    prob = getDetectionProbability();
    changeNote(prob);

    // appending heading only one time 
    //   var heading3 = document.createElement("h3");
    //    heading3.innerHTML = "All Targets";
    //    document.getElementById("tgts").appendChild(heading3);

    var ulist = document.createElement("ul");
    ulist.id = "myList";
    document.getElementById("tgts").appendChild(ulist);

    //var ulist =document.createElement("ul");
    //ulist.id = "myList2"
    //document.getElementById("tgts").appendChild(ulist);

    //var ulist =document.createElement("ul");
    //ulist.id = "myList3"
    //document.getElementById("tgts").appendChild(ulist);
    var max = -1;
    var min = 999999;
    for (k = 0; k < targets.length; k++) {

        var H = readVars(targets[k]);
        var values = readDRIvars(prob);
        D = values[0];
        for (l = 0; l < focalLengths.length; l++) {
            f = parseInt(focalLengths[l])
            tmp = 1000 * f * H / (D * p);
            if (tmp > max) {
                max = tmp;
            }
            if (tmp < min) {
                min = tmp;
            }

        }
    }
    for (i = 0; i < targets.length; i++) {
        var H = readVars(targets[i]);
        var dim = readSize(targets[i]);
        var values = readDRIvars(prob);
        D = values[0];
        R = values[1];
        I = values[2];
        var node = document.createElement("LI");
        node.id = "Node";
        /*if(targets[i]=='Human'||targets[i]=='Vehicle'||targets[i]=='Tank'){
	        document.getElementById("myList1").appendChild(node);	
		}
	    else if(targets[i]=='Boat'||targets[i]=='Ship'||targets[i]=='Warship'){
	        document.getElementById("myList2").appendChild(node);			
		}
		else if(targets[i]=='Drone'||targets[i]=='Jet'||targets[i]=='Airbus'){
	        document.getElementById("myList3").appendChild(node);			
		}*/
        document.getElementById("myList").appendChild(node);
        document.getElementById("Node").insertAdjacentHTML("beforeend", "<img src='media/" + targets[i] + ".png'/> <p>" + targets[i].toUpperCase() + " " + dim + " | CD: " + H.toFixed(2) +
            "m </p><p><span>D</span><span>R</span><span>I</span></p><div class='chartHolder'></div>");



        for (j = 0; j < focalLengths.length; j++) {

            f = parseInt(focalLengths[j])

            det = 1000 * f * H / (D * p);
            rec = 1000 * f * H / (R * p);
            iden = 1000 * f * H / (I * p);

            if (det % 10 > 5)
                det += 10 - (det % 10);
            else
                det -= det % 10;
            if (rec % 10 > 5)
                rec += 10 - (rec % 10);
            else
                rec -= rec % 10;
            if (iden % 10 > 5)
                iden += 10 - (iden % 10);
            else
                iden -= iden % 10;

            document.getElementById("Node").insertAdjacentHTML("beforeend", "<p> lens focal - " + f + " mm :</p><div class='chartHolder' ><div id = '" + targets[i] + "_" + focalLengths[j] + "' class='DchartBar'><span>" + det.toFixed(0) + " m </span></div><div id = '" + targets[i] + "_" + focalLengths[j] + "' class='RchartBar'><span>" + rec.toFixed(0) + " m </span></div><div id = '" + targets[i] + "_" + focalLengths[j] + "' class='IchartBar'><span>" + iden.toFixed(0) + " m </span></div></div>");
            //$("#"+targets[i]+"_"+focalLengths[j]+".DchartBar").css("width", Math.max((((det*100)/max)),30).toString()+"%");
            //$("#"+targets[i]+"_"+focalLengths[j]+".RchartBar").css("width", Math.max((((rec*100)/max)),20).toString()+"%");
            //$("#"+targets[i]+"_"+focalLengths[j]+".IchartBar").css("width", Math.max((((iden*100)/max)),10).toString()+"%");

            $("#" + targets[i] + "_" + focalLengths[j] + ".DchartBar").css("width", Math.min((3 + (Math.ceil(Math.sqrt(det) * 100)) / Math.floor(Math.sqrt(max))), 100).toString() + "%");
            $("#" + targets[i] + "_" + focalLengths[j] + ".RchartBar").css("width", (3 + (Math.ceil(Math.sqrt(rec) * 100)) / Math.floor(Math.sqrt(max))).toString() + "%");
            $("#" + targets[i] + "_" + focalLengths[j] + ".IchartBar").css("width", (2 + (Math.ceil(Math.sqrt(iden) * 100)) / Math.floor(Math.sqrt(max))).toString() + "%");


        }
        document.getElementById("Node").insertAdjacentHTML("beforeend", "<hr/>");

    }
    calculateFov();


}

function handleValues(input) {
    switch (input.id) {
        case 'CustomPitch':
            if (input.value <= 0) {
                if (lid == 'de') {
                    alert('Wellenlänge sollte > 0 sein');
                } else {
                    alert('Wavelength should be >0');
                }
                input.focus();
            }
            break;
        case 'CustomFocalLength':
            if (input.value == 0) {
                if (lid == 'de') {
                    alert('die Brennweite der Linse sollte  > 0 oder < 0 sein');
                } else {
                    alert('Lens focal length should be > 0 or < 0');
                }
                input.focus();
            }
            break;

        case 'CustomWidth':
            if (input.value < 1) {
                if (lid == 'de') {
                    alert('M-Squared sollte > 1 oder = 1 sein');
                } else {
                    alert('M-Squared should be > 1 or = 1');
                }
                input.focus();
            }
            break;
        case 'CustomHeight':
            if (input.value <= 0) {
                if (lid == 'de') {
                    alert('Strahldurchmesser sollte > 0 sein');
                } else {
                    alert('Beam diameter should be > 0');
                }
                input.focus();
            }
            break;
    }
}

function enableCustomPitch(CustomPitch) {
    var ele = document.getElementsByName('pitch');

    if (ele[5].checked) {
        document.getElementById(CustomPitch).disabled = false;
        document.getElementById('CustomPitch').style.color = "#00A2FF";
        document.getElementById('CustomPitch').style.borderColor = "#00A2FF";
        document.getElementById('CustomPitch').value = '13';
    } else {
        document.getElementById(CustomPitch).disabled = true;
        document.getElementById('CustomPitch').style.color = "#b7b7b7";
        document.getElementById('CustomPitch').style.borderColor = "#b7b7b7";
        document.getElementById('CustomPitch').placeholder = "Custom";
    }
}

function enableCustomFocalLength(CustomFocalLength) {
    if (document.getElementById(CustomFocalLength).disabled) {
        document.getElementById(CustomFocalLength).disabled = false;
        document.getElementById('CustomFocalLength').style.color = "#00A2FF";
        document.getElementById('CustomFocalLength').style.borderColor = "#00A2FF";
        document.getElementById('CustomFocalLength').value = '11';
    } else {
        document.getElementById(CustomFocalLength).disabled = true;
        document.getElementById('CustomFocalLength').style.color = "#b7b7b7";
        document.getElementById('CustomFocalLength').style.borderColor = "#b7b7b7";
        document.getElementById('CustomFocalLength').value = '';
        document.getElementById('CustomFocalLength').placeholder = "Custom";
    }
}

function enableCustomtarget(CustomWidth, CustomHeight) {
    if (document.getElementById(CustomWidth).disabled) {
        document.getElementById(CustomWidth).disabled = false;
        document.getElementById(CustomHeight).disabled = false;
        document.getElementById('CustomWidth').style.color = "#00A2FF";
        document.getElementById('CustomHeight').style.color = "#00A2FF";
        document.getElementById('CustomWidth').style.borderColor = "#00A2FF";
        document.getElementById('CustomHeight').style.borderColor = "#00A2FF";
        document.getElementById('CustomWidth').value = '2.3';
        document.getElementById('CustomHeight').value = '2.3';
    } else {
        document.getElementById(CustomWidth).disabled = true;
        document.getElementById(CustomHeight).disabled = true;
        document.getElementById('CustomWidth').style.color = "#b7b7b7";
        document.getElementById('CustomHeight').style.color = "#b7b7b7";
        document.getElementById('CustomWidth').style.borderColor = "#b7b7b7";
        document.getElementById('CustomHeight').style.borderColor = "#b7b7b7";
        document.getElementById('CustomWidth').placeholder = "Width";
        document.getElementById('CustomHeight').placeholder = "Height";
        document.getElementById('CustomWidth').value = '';
        document.getElementById('CustomHeight').value = '';
    }
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}


// Install input filters.
setInputFilter(document.getElementById("CustomWidth"), function(value) {
    return /^-?\d*[.,]?\d*$/.test(value);
});