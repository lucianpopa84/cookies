$(function () {
    var myCookies = {};

    function loadCookies() {
        myCookies = {};
        var cookiesArray = document.cookie.split(";"); // split saved cookies 
        for (var key in cookiesArray) {
            var cookie = cookiesArray[key].split("="); // split every saved cookie type 
            myCookies[cookie[0].trim()] = cookie[1]; // build key & value pairs for myCookies object
        }
        if (myCookies["userLanguage"]) { // if userLanguage cookie exists  
            console.log("User language: " + myCookies["userLanguage"]);
            if (myCookies["userLanguage"] == "EN") {
                document.getElementById("radioEN").checked = true; // select user language from cookie
                $("#languageSelectorEN").css("opacity", 1); // change image opacity
                $("#languageSelectorRO").css("opacity", 0.5); // change image opacity
            } else if (myCookies["userLanguage"] == "RO") {
                document.getElementById("radioRO").checked = true; // select user language from cookie
                $("#languageSelectorEN").css("opacity", 0.5); // change image opacity
                $("#languageSelectorRO").css("opacity", 1); // change image opacity
            }
            $("#languageDisplay").text(`Loaded language: ${myCookies["userLanguage"]}`);
        }
    }

    loadCookies();

    function saveLanguageCookie(language) {
        myCookies["userLanguage"] = language; // save language cookie
    }

    function saveCookies() {
        document.cookie = "";
        let cookiesExpireTime = 60 * 1000; // set cookies expire time (in miliseconds)
        let expireAttribute = new Date(Date.now() + cookiesExpireTime).toGMTString(); // set cookies expire attribute
        console.log("expire time:" + expireAttribute);
        var cookieString = "";
        for (var key in myCookies) {
            cookieString = key + "=" + myCookies[key] + "; expires =" + expireAttribute + ";path=/";
            document.cookie = cookieString; // save all cookie entries from cookieString in document.cookie
        }
    }

    $(".exercise h1").text("Cookie");
    $('.exercise #statement').html(`Set a cookie to remember the language, set cookie expire time to 1 minute.
    <br /> Testing procedure: 
    <br /> - select RO language
    <br /> - close tab 
    <br /> - open tab 
    <br /> - RO language must remain selected
    <br /> - set EN language 
    <br /> - repeat steps`); // exercise statement

    $('#languageForm input').on('change', function () {
        var checkedLanguage = $('input[name=languageRadio]:checked', '#languageForm').val();
        if (checkedLanguage == "EN") {
            $("#languageSelectorEN").css("opacity", 1); // change image opacity
            $("#languageSelectorRO").css("opacity", 0.5); // change image opacity
            saveLanguageCookie(checkedLanguage);
        } else {
            $("#languageSelectorEN").css("opacity", 0.5); // change image opacity
            $("#languageSelectorRO").css("opacity", 1); // change image opacity
            saveLanguageCookie(checkedLanguage);
        }
        console.log("Checked language: " + checkedLanguage);
        saveCookies();
        $("#languageDisplay").text(`Checked language: ${checkedLanguage}`);
    });

});