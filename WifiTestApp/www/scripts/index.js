// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var parentElement = document.getElementById('deviceready');
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    //button obejcts
    var submitBtn = document.getElementById("submit");
    var resettBtn = document.getElementById("reset");
    //working status obejct
    var startsworking = document.getElementById('startsworking');
    //cycle object
    var cycle = document.getElementById('cycle');
    //process bar objects
    var progress = document.getElementById('myProgress');
    var bar = document.getElementById('myBar');
    //check network obejct
    var checkNet;

    //network status obejct
    var online;
    var offline;
    //boolean for verify the network status
    var isOffline = false;
    //status
    var status = document.getElementById('statuLogs');
    
    var dateString = '123';

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        parentElement.className = '';
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //the submit button has been clicked
        submitBtn.addEventListener("click", submit);
        //when the reset button has been clicked
        resettBtn.addEventListener("click", reset);
        //dateString = date.getYear + "-" + date.getMonth() + 1 + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        //status += dateString;
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    //check network
    function checkNetwork() {
        online = document.addEventListener("online", onOnline, false);
        offline = document.addEventListener("offline", onOffline, false);
    }

    //when wifi or network offline
    function onOffline() {
        //alert('You are now offline!');
        isOffline = true;
        status.innerHTML += 'Offline at: ' + Date() + '<br>';
    }
    function onOnline() {
        //alert('You are now online!');
        isOffline = false;
    }

    function networkInfo() {
        var networkState = navigator.connection.type;
        var states = {};

        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        return 'Connection type: ' + states[networkState];
    }
    //submit function
    function submit() {
        ////get cycle running
        //cycle.className = "cycle";
        //var app = document.getElementById('body');
        //app.setAttribute("style", "background-color:#E4E4E4;")

        //disable the submit button
        submitBtn.disabled = true;

        //display network status info
        status.innerHTML += networkInfo() + '<br>';
        status.innerHTML += 'Test Started at: ' + Date() + '<br>';

        //change the deviceready to start working
        startsworking.innerHTML = 'Testing...';
        
        //get the testing time value
        if (document.getElementById('10mins').checked) {
            //do
            processBar(1);
        }
        else if (document.getElementById('30mins').checked) {
            //do
            processBar(3);
        }
        else if (document.getElementById('60mins').checked) {
            //do
            processBar(60);
        }
    }
    //reset function
    function reset() {
        ////disable the cycle
        //cycle.className = "";
        //enable the sumbit button
        submitBtn.disabled = false;

        //reset the testing time
        document.getElementById('10mins').checked = true;
        document.getElementById('30mins').checked = false;
        document.getElementById('60mins').checked = false;

        //reset the working status
        startsworking.innerHTML = 'Device is Ready';
        
        //reset the process bar
        var elem = document.getElementById("myBar");
        elem.style.width = 0;

        //clear the status log
        status.innerHTML = '';
    }

    //process bar
    function processBar(minute) {
        //set reset button click event
        resettBtn.addEventListener("click", resetProcess);

        var width = 0;
        var id = setInterval(frame, minute * 60 * 10);
        function frame() {
            if (width == 100) {
                clearInterval(id);
                //disable the cycle
                //cycle.className = "";
                //disable the animation
                parentElement.className = '';
                //reset status to device ready
                startsworking.innerHTML = 'Done';
                //enable submit button
                submitBtn.disabled = false;
                status.innerHTML += 'Test finished at: ' + Date() + '<br>';
            }
            else {
                width++;
                bar.style.width = width + '%';
                parentElement.className = 'blink';
                //check the network if is offline
                checkNetwork();
                if (isOffline) {
                    //status.innerHTML += 'Offline at: ' + Date() + '<br>';
                }
            }
        }

        function resetProcess() {
            clearInterval(id);
            bar.style.width = 0 + '%';
            //disable the animation
            parentElement.className = '';
            
        }
        
    }

})();