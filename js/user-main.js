var myarray = [];
var matchIdarray = [];
var fancyIdarray = [];
var currentBet = '';
var currentBetMarketId = '';
var currentMatchBet = 0;
var currentMatchBetUn = 0;
var getScore = 0;
var slide = 0;
var xhrPool = [];
var isBet = 0;
$('document').ready(function () {
   	 
    setInterval(function () {
        getBackLaysOfMarketOdds(myarray, userId1, userType1, matchIdarray);
    }, 1500);
    if (userType1 != 3) {
        setInterval(function () {
            MasterDealerData(myarray, userId1, userType1, matchIdarray);
            //updateOdds();		
        }, 5000);
    }
    setInterval(function () {
		
		
		if($("#SportIdTennis").val() != '2'){
			GetScoreApi(matchIdarray);
		}
        checkLogin();
    }, 5000);
    $('#updateUserChip').click(function () {
        var Name1 = $("#Name1").val();
        var Name2 = $("#Name2").val();
        var Name3 = $("#Name3").val();
        var Name4 = $("#Name4").val();
        var Name5 = $("#Name5").val();
        var Name6 = $("#Name6").val();
        var Value1 = parseInt($("#Value1").val());
        var Value2 = parseInt($("#Value2").val());
        var Value3 = parseInt($("#Value3").val());
        var Value4 = parseInt($("#Value4").val());
        var Value5 = parseInt($("#Value5").val());
        var Value6 = parseInt($("#Value6").val());
        var i = 0;
        $(".form-control").removeClass("bordar_highlight");
        if (Name1 == '') {
            $("#Name1N").text('Please Enter Chip Name');
            $("#Name1").addClass("bordar_highlight");
            i = 1;
        } else if (Name1.length < 2) {
            $("#Name1N").text('Chip Name must be 4 charecters');
            $("#Name1").addClass("bordar_highlight");
            i = 1;
        }
        if (Name2 == '') {
            $("#Name2N").text('Please Enter Chip Name');
            $("#Name2").addClass("bordar_highlight");
            i = 1;
        } else if (Name2.length < 2) {
            $("#Name2N").text('Chip Name must be 4 charecters');
            $("#Name2").addClass("bordar_highlight");
            i = 1;
        }
        if (Name3 == '') {
            $("#Name3N").text('Please Enter Chip Name');
            $("#Name3").addClass("bordar_highlight");
            i = 1;
        } else if (Name3.length < 2) {
            $("#Name3N").text('Chip Name must be 4 charecters');
            $("#Name3").addClass("bordar_highlight");
            i = 1;
        }
        if (Name4 == '') {
            $("#Name4N").text('Please Enter Chip Name');
            $("#Name4").addClass("bordar_highlight");
            i = 1;
        } else if (Name4.length < 2) {
            $("#Name4N").text('Chip Name must be 4 charecters');
            $("#Name4").addClass("bordar_highlight");
            i = 1;
        }
        if (Name5 == '') {
            $("#Name5N").text('Please Enter Chip Name');
            $("#Name5").addClass("bordar_highlight");
            i = 1;
        } else if (Name5.length < 2) {
            $("#Name5N").text('Chip Name must be 4 charecters');
            $("#Name5").addClass("bordar_highlight");
            i = 1;
        }
        if (Name6 == '') {
            $("#Name6N").text('Please Enter Chip Name');
            $("#Name6").addClass("bordar_highlight");
            i = 1;
        } else if (Name6.length < 2) {
            $("#Name6N").text('Chip Name must be 4 charecters');
            $("#Name6").addClass("bordar_highlight");
            i = 1;
        }
        if (Value1 == '' || isNaN(Value1)) {
            $("#Value1N").text('Please Enter Chip Value');
            $("#Value1").addClass("bordar_highlight");
            i = 1;
        }
        if (Value2 == '' || isNaN(Value2)) {
            $("#Value2N").text('Please Enter Chip Value');
            $("#Value2").addClass("bordar_highlight");
            i = 1;
        }
        if (Value3 == '' || isNaN(Value3)) {
            $("#Value3N").text('Please Enter Chip Value');
            $("#Value3").addClass("bordar_highlight");
            i = 1;
        }
        if (Value4 == '' || isNaN(Value4)) {
            $("#Value4N").text('Please Enter Chip Value');
            $("#Value4").addClass("bordar_highlight");
            i = 1;
        }
        if (Value5 == '' || isNaN(Value5)) {
            $("#Value5N").text('Please Enter Chip Value');
            $("#Value5").addClass("bordar_highlight");
            i = 1;
        }
        if (Value6 == '' || isNaN(Value6)) {
            $("#Value6N").text('Please Enter Chip Value');
            $("#Value6").addClass("bordar_highlight");
            i = 1;
        }
        if (i == 0) {
            var datastring = $("#stockez_add").serialize();
            $.ajax({
                type: "POST",
                url: site_url + 'Createdealercontroller/updateUserChipSetting/',
                data: datastring, //only input
                cache: false,
                dataType: 'json',
                success: function (output)
                {
                    //  console.log(output);
                    //    console.log(output.status);
                    if (output.status.error == 0) {
                        $("#addUserMsg").show();
                        $("#addUserMsg").html("<span class='succmsg'>" + output.status.message + "</span>");
                        $("#addUserMsg").fadeOut(3000);
                        $(".chipName1").text(Name1);
                        $(".chipName2").text(Name2);
                        $(".chipName3").text(Name3);
                        $(".chipName4").text(Name4);
                        $(".chipName5").text(Name5);
                        $(".chipName6").text(Name6);
                        $(".chipName1").val(Value1);
                        $(".chipName2").val(Value2);
                        $(".chipName3").val(Value3);
                        $(".chipName4").val(Value4);
                        $(".chipName5").val(Value5);
                        $(".chipName6").val(Value6);
                        setTimeout(function () {
                            $("#addUser").modal('hide');
                        }, 3000);
                    } else {
                        $("#addUserMsg").show();
                        $("#addUserMsg").html("<span class='errmsg'>" + output.status.message + "</span>");
                        $("#addUserMsg").fadeOut(3000);
                    }
                }
            });
        }
        i++;
    });
    $('#UserChipData').click(function () {
        setChipStackVal();
    });
});
$(".MatchHide").click(function () {
    $(".MatchHideShow").slideToggle("fast");
    $(this).find(".MatchHideDown").toggleClass("down up");
});
$(".MatchTvHide").click(function () {
    $(".MatchTvHideShow").slideToggle("fast");
    $(this).find(".MatchTvHideDown").toggleClass("down up");
});
function deleteunMatchOdds(MstCode, UserId) {
   
    $.ajax({
        url: site_url + 'useraction/deleteGetbetting',
        data: {MstCode: MstCode, UserId: UserId},
        type: 'get',
        dataType: 'json',
        success: function (output)
        {
            //	console.log(output);
            if (output.error == '0') {
                jQuery("#user_row_" + MstCode).remove();  //Deleted Successfully ...
                new PNotify({
                    title: 'Success',
                    text: output.message,
                    type: 'success',
                    styling: 'bootstrap3',
                    delay: 3000
                });
            } else {
                new PNotify({
                    title: 'Error',
                    text: output.message,
                    type: 'error',
                    styling: 'bootstrap3',
                    delay: 3000
                });
            }
        }
    });
    //	}
}

function refereshOdds() {
    $.ajax({
        url: site_url + 'Geteventcntr/upDatecache',
        async: false,
        success: function (output)
        {
            res = JSON.parse(output);
            //alert(output.Liability);
            $('#Wallet').html('W:' + res[0].Balance);
            $('#UserLiability').html('L : ' + res[0].Liability);
            $(".UserLiability").text(res[0].Liability);
            $(".Wallet").text(res[0].Balance);
            $(".FreeChip").text(res[0].FreeChip);
            $(".Chip").text(res[0].Chip);
        }
    });
    abortAjax();
}
function getoddsall(sportid, id, type, matchid) {
    //alert("here");
    if ($("#list_of" + matchid).is(':empty')) {
        getMarketMatch(matchid, sportid, id, type, 0);
        //alert("here");
        $('#odds' + matchid).click();
    } else {
        $('#odds' + matchid).click();
    }
}
function fancySelection(fancyId, userId, userType, matchId, MarketId) {
    abortAjax();
    var index = fancyIdarray.indexOf(fancyId.toString());
    if (index > -1) {
        fancyIdarray.splice(index, 1);
    }
    //MarketSelection(MarketId,userId,userType,matchId)
}
function removeFancy(matchId, fancyID, MFancyID) {
    abortAjax();
    if (fancyIdarray.indexOf(fancyID) == -1) {
        fancyIdarray.push(fancyID.toString());
    }
    $("#fancyM_" + fancyID).hide();
}
function goBack() {
    window.history.back();
}
function FavFunc(matchid, marketid) {
    $.ajax({
        url: site_url + 'Geteventcntr/favorite/',
        type: "POST",
        data: {matchid: matchid, marketid: marketid},
        success: function (output)
        {
            $("#fav" + matchid).html(output);
        }
    });
}
function calc() {
    var isfancy = $("#isfancy").val();
    var priceVal = parseFloat($("#ShowBetPrice").val());
    var t_stake = parseFloat($("#stakeValue").val());
    var isback = $("#isback").val();
    if (isfancy == 0) {
        var pl = Math.round((priceVal * t_stake) - t_stake);
        pl = parseFloat(pl.toFixed(2));
        if (isback == 0) {
            $("#profitData").text(pl);
            $("#LossData").text(t_stake);
        } else {
            $("#LossData").text(pl);
            $("#profitData").text(t_stake);
        }
        SetPosition(priceVal);
    } else {
        var inputno = parseInt($('#LayNO_' + isfancy).text());
        var inputyes = parseInt($('#BackYes_' + isfancy).text());
        var YesValume = parseFloat($("#YesValume_" + isfancy).text());
        var NoValume = parseFloat($("#NoValume_" + isfancy).text());
        var pl = parseFloat(t_stake);
        //pl = pl.toFixed(2);
        if (inputno == inputyes) {
            if (isback == 0) {
                $("#profitData").text((YesValume * pl / 100).toFixed(2));
                $("#LossData").text(pl.toFixed(2));
            } else {
                $("#LossData").text((NoValume * pl / 100).toFixed(2));
                $("#profitData").text(pl.toFixed(2));
            }
        } else {
            $("#profitData").text(pl.toFixed(2));
            $("#LossData").text(pl.toFixed(2));
        }
    }
}
function StaKeAmount(stakeVal) {
    var stakeValue = parseFloat(stakeVal.value);
    var stakeVal = parseFloat($("#stakeValue").val());
    var t_stake = parseFloat(stakeValue + stakeVal);
    $("#stakeValue").val(t_stake);
    calc();
}
$(document).on('keyup', '.calProfitLoss', function () {
    calc();
});
function getPosition(fancyid) {
    $.ajax({
        url: site_url + 'Geteventcntr/getPosition/',
        data: {fancyid: fancyid, userId1: userId1},
        type: "POST",
        success: function (output)
        {
            $("#fancyposition .modal-body").html(output);
            $('#fancyposition').modal('toggle');
        }
    });
}
function PlaceFancy()
{
    isBet = 1;
    abortAjax();
    var amount = parseFloat($("#stakeValue").val());
    var OddValue = $('#isback').val();
    var betOddValue = $("#ShowBetPrice").val();
    var fancyid = $("#isfancy").val();
    sessionData = {
        betValue: amount,
        FancyID: fancyid,
        matchId: $("#matchId").val(),
        OddValue: OddValue,
        type: 3,
        TypeID: 2,
        HeadName: $('#placeName').val(),
        sportId: 4,
        FancyId: $('#mfancyid').val(),
        pointDiff: $('#pointDiff').val(),
        deviceInformation: '',
        YesValume: $("#YesValume_" + fancyid).text(),
        NoValume: $("#NoValume_" + fancyid).text()
    };
    $(".CommanBtn").attr("disabled", true);
    $(".loader").show();
    $.ajax({
        url: site_url + 'Useraction/viewUserAcBetDelay/',
        type: "POST",
        dataType: 'json',
        async: false,
        success: function (output)
        {
            var BetDelay = (parseInt(output.viewUserAc2[0].fancy_set_timeout) * 1000);
            setTimeout(function () {
                $.ajax({
                     url: site_url + 'Geteventcntr/fancyBetData/',
                    type: "POST",
                    data: {FancyID: sessionData.FancyID, matchId: sessionData.matchId},
                    dataType: 'json',
                    async: false,
                    success: function (output)
                    {
                        var is_bet = '';
                        var fancyS = output.fancy[0].active;
                        var totalProfit = parseFloat(output.userprofitValue) + amount;
                        sessionData.SessInptYes = output.fancy[0].SessInptYes;
                        sessionData.SessInptNo = output.fancy[0].SessInptNo;
                        if (OddValue == 0) {
                            sessionData.OddsNumber = sessionData.SessInptYes;
                        } else {
                            sessionData.OddsNumber = sessionData.SessInptNo;
                        }
                        if (output.viewUserAc2[0].mstrlock == '0') {
                            is_bet = 'Your Account is InActive...';
                        } else if (output.viewUserAc2[0].lgnusrCloseAc == '0') {
                            is_bet = 'Your Account is Closed...';
                        } else if (output.viewUserAc2[0].lgnusrlckbtng == '0') {
                            is_bet = 'Your Betting is Locked...';
                        } else if (amount < output.genSetting.fancy_min_stake) {
                            is_bet = 'Min stake is ' + output.genSetting.fancy_min_stake;
                        } else if (amount > output.genSetting.fancy_max_stake) {
                            is_bet = 'Max stake is ' + output.genSetting.fancy_max_stake;
                        } else if (sessionData.OddsNumber <= 0) {
                            is_bet = 'You cannot play at Zero stake...';
                        } else if (fancyS == 4) {
                            is_bet = 'Fancy Suspended...';
                        } else if (fancyS == 0) {
                            is_bet = 'Ball Started...';
                        } else if (fancyS == 2) {
                            is_bet = 'Fancy Closed...';
                        } else if (betOddValue != sessionData.OddsNumber) {
                            is_bet = 'Rate change...'
                        } else if (parseFloat(output.viewUserAc2[0].fancy_max_profit) != 0 && parseFloat(output.viewUserAc2[0].fancy_max_profit) < totalProfit) {
                            is_bet = 'Your Max Profit is Over...';
                        } else if (parseFloat(output.genSetting.fancy_max_profit) != 0 && parseFloat(output.genSetting.fancy_max_profit) < totalProfit) {
                            is_bet = 'Your Max Profit is Over...';
                        } else if (output.is_odd_updated == 'N') {
                            is_bet = 'Bet cannot be placed...';
                        }
                        if (is_bet == '')
                        {
                            $.ajax({
                                method: 'POST',
                                url: site_url + 'useraction/saveUserFancy/',
                                data: sessionData,
                                dataType: 'JSON',
                                async: false,
                                success: function (data) {
                                    isBet = 0;
                                    $(".CommanBtn").attr("disabled", false);
                                    $(".loader").hide();
                                    //alert(data.error);
                                    ClearAllSelection(1);
                                    if (data.error == 0) {
                                        $("#UserLiability").text(data.cipsData[0].Liability);
                                        $("#Wallet").text(data.cipsData[0].Balance);
                                        $(".UserLiability").text(data.cipsData[0].Liability);
                                        $(".Wallet").text(data.cipsData[0].Balance);
                                        $(".FreeChip").text(data.cipsData[0].FreeChip);
                                        $(".Chip").text(data.cipsData[0].Chip);
                                        //getBets(sessionData.matchId, '');
                                        setBetData('0', sessionData.matchId);
                                        currentMatchBet = currentMatchBet + 1;
                                        new PNotify({
                                            title: 'Success',
                                            text: 'Place Bet Successfully...',
                                            type: 'success',
                                            styling: 'bootstrap3',
                                            delay: 3000
                                        });
                                    } else {
                                        new PNotify({
                                            title: 'Error',
                                            text: 'Insufficient balance..',
                                            type: 'error',
                                            styling: 'bootstrap3',
                                            delay: 3000
                                        });
                                    }
                                }
                            });
                        } else {
                            isBet = 0;
                            $(".CommanBtn").attr("disabled", false);
                            $(".loader").hide();
                            new PNotify({
                                title: 'Error',
                                text: is_bet,
                                type: 'error',
                                styling: 'bootstrap3',
                                delay: 3000
                            });
                        }
                    }
                });
            }, BetDelay);
        }
    });
}
function betfancy_user(matchid, fancyid, inputyes, inputno, pointdiff, MFancyID, isback) {
    if (userType1 == 3)
    {
        var inputno = parseInt($('#LayNO_' + fancyid).text());
        var inputyes = parseInt($('#BackYes_' + fancyid).text());
        var pointdiff = parseFloat($('#pointDiff_' + fancyid).val());
        var MFancyID = parseInt($('#MFancyID_' + fancyid).val());
        var headname = $(".fancyhead" + fancyid).text();
        if (isback == 0) {
            $("#bettypinfo").attr('class', 'bet-type-info back');
            $("#bettypinfo").text('Back');
            $("#betDiv").attr('class', 'bet back');
            $("#ShowBetPrice").val(inputyes);
            $('#backDiv').show();
            $('#layDiv').hide();
        } else {
            $("#bettypinfo").attr('class', 'bet-type-info lay');
            $("#bettypinfo").text('Lay');
            $("#betDiv").attr('class', 'bet lay');
            $("#ShowBetPrice").val(inputno);
            $('#backDiv').hide();
            $('#layDiv').show();
        }
        $("#stakeValue").focus();
        $('#stakeValue').val(0);
        $("#profitData").text(0.00);
        $("#LossData").text(0.00);
        $('#matchId').val(matchid);
        $('#isback').val(isback);
        $('#placeName').val(headname);
        $("#isfancy").val(fancyid);
        $("#mfancyid").val(MFancyID);
        $("#pointDiff").val(parseInt(pointdiff));
        $("#ShowBetPrice").prop('disabled', true);
        $(".placebet").hide();
        $(".placefancy").show();
        $("#ShowRunnderName").text(headname);
        if ($(window).width() < 780)
        {
            $("#betslip").insertAfter('.fancy_' + fancyid);
            $("#betslip").show();
             $('#betDiv').show();
        } else {
            $("#betslip").show();
            $(".betBox").show();
        }
    }
}
function closeBetBox(matchId, MarketId) {
    var index = myarray.indexOf(MarketId.toString());
    if (index > -1) {
        myarray.splice(index, 1);
        matchIdarray.splice(index, 1);
    }
    if (matchId == $('#matchId').val()) {
        ClearAllSelection(1);
    }
    MId = MarketId.replace('.', '');
    $(".matchBoxs_" + MId).html('');
    if (currentBetMarketId == MarketId) {
        $("#MatchUnMatchBetaData").html('');
        $("#accountView").html('');
    }
    if (myarray.length == 0) {
        //$(".matchBox").html('');	
        $(".matchBox").hide();
        upcommingMatchData();
    } else {
        currentBet = matchIdarray[0];
        currentBetMarketId = myarray[0];
        getBets(currentBet, currentBetMarketId);
    }
}
function MarketSelection(MarketId, userId, userType, matchId,isMatchOdds=1) {
    abortAjax();    
    //$("#UpCommingData").html('');
    if (myarray.indexOf(MarketId) == -1) {
        if(isMatchOdds==1){	
            $("#MatchOddInfo").html('');
            myarray=[MarketId];	
            matchIdarray=[matchId];
            currentBet = matchId;
            currentBetMarketId = MarketId;		
        }else{
                myarray.push(MarketId.toString());
                matchIdarray.push(matchId.toString());
        }        
        currentMatchBet = '';
        currentMatchBetUn = '';
        // console.log(matchIdarray);
        //console.log(myarray);
        $.ajax({
            url: site_url + 'Geteventcntr/getBackLaysOfMarketSelectionName',
            data: {MarketId: MarketId, userId: userId, userType: userType, matchId: matchId, MatchId: matchId,isMatchOdds:isMatchOdds},
            type: 'get',
            dataType: 'html',
            async: false,
            success: function (output)
            {
				 
                $('nav').attr('data-left','100%');
                $('nav').attr('style','left:-100%');
                $("#matchId_"+matchId).parent().addClass("slider-menu-active");
                $(".matchBox").show();
                $("#UpCommingData").hide();
                $("#MatchOddInfo").show();
                $(".betSlipBox").show();
                if(isMatchOdds==1){						
                    MatchOtherMarket(userId, userType, matchId);
                    if (userType == 3){ 
                            setBetData(MarketId, matchId);
                    }
                    $("#MatchOddInfo").addClass('col-md-7 col-sm-6 clearfix');
                    $("#MatchOddInfo").append(output);
                } else {
                    $("#otherMarkets").append(output);
                }
                $('.openMarket' + matchId).trigger("click");


				if($("#SportIdTennis").val() == '2'){

					$("#tennisScore").html('    <iframe src="https://videoplayer.betfair.com/GetPlayer.do?tr=2&amp;contentType=viz&amp;contentView=viz&amp;allowPopup=true&amp;contentOnly=true&amp;eID='+matchId+'&amp;width=374&amp;height=214" data-src="https://videoplayer.betfair.com/GetPlayer.do?tr=2&amp;contentType=viz&amp;contentView=viz&amp;allowPopup=true&amp;contentOnly=true&amp;eID='+matchId+'&amp;width=374&amp;height=214" class="player" frameborder="0" width="374" height="214" scrolling="no" id="yui_3_5_0_1_1543488472026_35500"></iframe>'); 
				}



            }
        });        
    }
}
function MatchOtherMarket(userId, userType, matchId){
    $.ajax({
        url: site_url + 'Geteventcntr/matchOtherMarketLst',
        data: { matchId: matchId},	
        success: function (output)
        {
            output.forEach(function (arrayItem) {				
                    MarketSelection(arrayItem.ID , userId, userType, matchId,0);
            });
        }
    });
}

function SetPosition(priceVal) {
    var MarketId = $("#MarketId").val();
    var MId = MarketId.replace('.', '');
    var selectionId = $("#selectionId").val();
    var isback = $("#isback").val();
    var stake = parseFloat($("#stakeValue").val());
    $(".position_" + MId).each(function (i) {
        var selecid = $(this).attr('data-id');
        var winloss = parseFloat($(this).val());
        var curr = 0;
        if (selectionId == selecid) {
            if (isback == 0) {
                curr = winloss + ((priceVal * stake) - stake);
            } else {
                curr = winloss + (-1 * parseFloat((priceVal * stake) - stake));
            }
        } else {
            if (isback == 0) {
                curr = winloss + (-1 * (stake));
            } else {
                curr = winloss + stake;
            }
        }
        var currV = Math.round(curr);
        $("#" + selecid + "_maxprofit_loss_runner_" + MId).text(Math.abs(currV)).css('color', getValColor(currV));
    });
}
function getValColor(val) {
    if (val == '' || val == null || val == 0)
        return '#000000';
    else if (val > 0)
        return '#007c0e';
    else
        return '#ff0000';
}
function ClearAllSelection(hide = 1) {
    $("#stakeValue").val(0);
    var MarketId = $("#MarketId").val();
    var MId = MarketId.replace('.', '');
    $(".position_" + MId).each(function (i) {
        var selecid = $(this).attr('data-id');
        var winloss = parseFloat($(this).val());
        $("#" + selecid + "_maxprofit_loss_runner_" + MId).text(Math.abs(winloss)).css('color', getValColor(winloss));
    });
    $("#profitData").text(0);
    $("#LossData").text(0);
    if (hide == 1) {
        if ($(window).width() < 780) {        
            $('#betDiv').hide();
        } else {
            $(".betBox").hide();
        }
    } else {
        if ($(window).width() < 780) {        
            $('#betDiv').show();
        } else {
            $(".betBox").show();
        }
}
}
function ClearStack(hide = 1) {
    $("#stakeValue").val(0);
    //var matchid = $("#matchId").val();
    var MarketId = $("#MarketId").val();
    var MId = MarketId.replace('.', '');
    $(".position_" + MId).each(function (i) {
        var selecid = $(this).attr('data-id');
        var winloss = parseFloat($(this).val());
        $("#" + selecid + "_maxprofit_loss_runner_" + MId).text(Math.abs(winloss)).css('color', getValColor(winloss));
    });
    $("#profitData").text(0);
    $("#LossData").text(0);
}
function abortAjax() {
    $.each(xhrPool, function (idx, jqXHR) {
        jqXHR.abort();
    });
}
function getApiFrom(formData)   //profitData
{
    abortAjax();
    $.ajax({
        method: 'POST',
        // url: 'Betentrycntr/Save_bet/',
        url: site_url + 'useraction/Save_bet/',
        data: formData,
        dataType: 'json',
        async: false,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: function (data)
        {
			isBet =0;
            $(".loader").hide();
            ClearAllSelection(1);
            $(".CommanBtn").attr("disabled", false);
            if (data.error == 1) {
                new PNotify({
                    title: 'Error',
                    text: data.message,
                    type: 'error',
                    styling: 'bootstrap3',
                    delay: 3000
                });
            } else if (data.isMatched == '0') {
                currentMatchBet = currentMatchBet + 1;
                //$(".loader").hide();
                $("#UserLiability").text(data.ChipData[0].Liability);
                $("#Wallet").text(data.ChipData[0].Balance);
                $(".UserLiability").text(data.ChipData[0].Liability);
                $(".Wallet").text(data.ChipData[0].Balance);
                $(".FreeChip").text(data.ChipData[0].FreeChip);
                $(".Chip").text(data.ChipData[0].Chip);
                MId = formData.MarketId.replace('.', '');
                $.each(data.RunnerValue, function (keyNew, valueNew) {
                    var minvalue = parseFloat(valueNew.winValue);
                    var lossValue = parseFloat(valueNew.lossValue);
                    var selectionId = valueNew.SelectionId;
                    var newVal = minvalue + lossValue;
                    $("#" + selectionId + "_maxprofit_loss_runner_" + MId).text(Math.abs(newVal)).css('color', getValColor(newVal));
                });
                //getBets(formData.matchId, formData.MarketId, 0);
                setBetData(formData.MarketId,formData.matchId);
                new PNotify({
                    title: 'Success',
                    text: 'Unmatched Bet Placed SuccessFully',
                    type: 'info',
                    styling: 'bootstrap3',
                    delay: 3000
                });
                if ($(window).width() < 768) {
                    //$("#openbetsMob").show();
                } else {
                    $("#betData").show();
                }
            } else {
                currentMatchBet = currentMatchBet + 1;
                $("#UserLiability").text(data.ChipData[0].Liability);
                $("#Wallet").text(data.ChipData[0].Balance);
                $(".UserLiability").text(data.ChipData[0].Liability);
                $(".Wallet").text(data.ChipData[0].Balance);
                $(".FreeChip").text(data.ChipData[0].FreeChip);
                $(".Chip").text(data.ChipData[0].Chip);
                MId = formData.MarketId.replace('.', '');
                $.each(data.RunnerValue, function (keyNew, valueNew) {
                    var minvalue = parseFloat(valueNew.winValue);
                    var lossValue = parseFloat(valueNew.lossValue);
                    var selectionId = valueNew.SelectionId;
                    var newVal = minvalue + lossValue
                    var newVal = Math.round(newVal);
                    $("#" + selectionId + "_maxprofit_loss_runner_" + MId).text(Math.abs(newVal)).css('color', getValColor(newVal));
                    $(".position_" + formData.matchId).each(function (i) {
                        var selecid = $(this).attr('data-id');
                        //alert(selecid);
                        if (selectionId == selecid) {
                            $(this).val(newVal);
                        }
                    });
                });
                $(".position_" + formData.matchId).each(function (i) {
                    var selecid = $(this).attr('data-id');
                    $.each(data.RunnerValue, function (keyNew, valueNew) {
                    });
                });
                //getBets(formData.matchId, formData.MarketId, 0);
                setBetData(formData.MarketId,formData.matchId);
                new PNotify({
                    title: 'Success',
                    text: 'Bet Placed SuccessFully',
                    type: 'success',
                    styling: 'bootstrap3',
                    delay: 3000
                });
                if ($(window).width() < 768) {
                    //$("#openbetsMob").show();
                } else {
                    $("#betData").show();
                }
            }
        }
    });
}
function PlaceBet() {
	isBet =1;
    $(".loader").show();
    var stake = parseFloat($("#stakeValue").val());
    var priceVal = parseFloat($("#ShowBetPrice").val());
    if (!$.isNumeric(priceVal) || priceVal < 1) {
        new PNotify({
            title: 'Check Odds value',
            text: 'Odds Value Must be grater than 1',
            type: 'error',
            styling: 'bootstrap3',
            delay: 3000
        });
		isBet =0;
        $("#stakeValue").val(0);
        $("#profitData").text('');
        $("#LossData").text('');
        $(".loader").hide();
        return false;
    } else if (!$.isNumeric(stake) || stake < 1) {
        new PNotify({
            title: 'Error',
            text: 'Invalid stake.',
            type: 'error',
            styling: 'bootstrap3',
            delay: 3000
        });
		isBet =0;
        $("#stakeValue").val(0);
        $("#profitData").text('');
        $("#LossData").text('');
        $(".loader").hide();
        return false;
    }
    $(".CommanBtn").attr("disabled", true);
    var MarketId = $("#MarketId").val();
    var matchId = $("#matchId").val();
    var userId = $("#userId").val();
    var stakeValue = parseInt($("#stakeValue").val());
    var P_and_l = (priceVal * stake) - stake;
    if (MarketId != '' && matchId != '' && userId != '')
    {
        abortAjax();
        $.ajax({
            url: site_url + 'Useraction/viewUserAcBetDelay/',
            data: {slctUseID: userId},
            type: "post",
            dataType: 'json',
            cache: false,
            async: false,
            success: function (output)
            {
                formData = {
                    userId: $("#userId").val(),
                    ParantId: $("#ParantId").val(),
                    loginId: $("#loginId").val(),
                    selectionId: $("#selectionId").val(),
                    matchId: $("#matchId").val(),
                    isback: $("#isback").val(),
                    UserTypeId: $("#userType").val(),
                    placeName: $("#placeName").val(),
                    MatchName: $("#MatchName").val(),
                    stake: stake,
                    priceVal: priceVal,
                    p_l: P_and_l,
                    MarketId: MarketId,
                    //  isMatched: 0
                };
                var BetDelay = (parseInt(output.viewUserAc2[0].set_timeout) * 1000);
                setTimeout(function () {
                    getApiFrom(formData);
                }, BetDelay);
            }
        });
    } else {
        new PNotify({
            title: ' Error',
            text: 'Some Thing Went worng',
            type: 'error',
            styling: 'bootstrap3',
            delay: 3000
        });
		isBet =0;
        $("#stakeValue").val(0);
        $("#profitData").text('');
        $("#LossData").text('');
        $(".CommanBtn").attr("disabled", false);
        $(".loader").hide();
    }
}
function getOddValue_user(priceVal, matchId, marketId, back_layStatus, placeName, selectionId, className) {
    if (userType1 == 3 && $('.' + className).hasClass('betting-disabled') === false) {
        $("#stakeValue").blur();
        if (back_layStatus == 0) {
            $("#bettypinfo").attr('class', 'bet-type-info back');
            $("#bettypinfo").text('Back');
            $("#betDiv").attr('class', 'bet back');
            $('#backDiv').show();
            $('#layDiv').hide();
        } else {
            $("#bettypinfo").attr('class', 'bet-type-info lay');
            $("#bettypinfo").text('Lay');
            $("#betDiv").attr('class', 'bet lay');
            $('#backDiv').hide();
            $('#layDiv').show();
        }
        var priceVal = parseFloat(priceVal);
        var priceVal = $.trim($("#" + className).text());
        if (priceVal != '' && matchId != '' && back_layStatus != '' && placeName != '' && selectionId != '') {
            if ($(window).width() < 780)
            {
                $("#betslip").insertAfter('#' + selectionId + '_row');
                $("#betslip").show();
            }
            $(".betBox").show();
            $(".placebet").show();
            $(".placefancy").hide();
            $("#ShowRunnderName").text(placeName);
            $("#ShowBetPrice").val(priceVal);
            $("#chkValPrice").val(priceVal);
            $("#selectionId").val(selectionId);
            $("#matchId").val(matchId);
            $("#MarketId").val(marketId);
            $("#isback").val(back_layStatus);
            $("#placeName").val(placeName);
            $("#isfancy").val(0);
            $("#ShowBetPrice").prop('disabled', false);
            ClearAllSelection(0);
            calc();
        }
    }
}
function updateUnMatchedData(MstCode, BackLay, MatchId, MarketID) {
    $.ajax({//Betentrycntr/GatBetData/
        url: site_url + 'Application/updateUnMatchedData',
        data: {marketId: MarketID, matchId: MatchId, MstCode: MstCode, BackLay: BackLay},
        type: 'post',
        dataType: 'JSON',
        success: function (output1)
        {
            //console.log(output1);
            $.each(output1.runnerValue, function (keyNew, valueNew) {
                var selectionId = valueNew.SelectionId;
                var MId = MarketID.replace('.', '');
                var newVal = Math.round(parseFloat(valueNew.winValue) + parseFloat(valueNew.lossValue));
                $("#" + selectionId + "_maxprofit_loss_runner_" + MId).text(Math.abs(newVal)).css('color', getValColor(newVal));
                $(".position_" + MId).each(function (i) {
                    var selecid = $(this).attr('data-id');
                    if (selectionId == selecid) {
                        $(this).val(newVal);
                    }
                });
            });
            if (currentBet == MatchId) {
                //getBets(MatchId, MarketID);                
                setBetData(MarketID, MatchId);
            }
            return 1;
        }
    });
}
function getBackLaysOfMarketOdds(myarray, userId1, userType1, matchIdarray)
{
    $(".table td").removeClass('yello');
    if (myarray.length > 0 && isBet == 0) {
        $.ajax({
            url: site_url + 'Geteventcntr/getMatchOdds',
            data: {myarray: myarray, userId1: userId1, userType1: userType1, matchIdarray: matchIdarray, fancyIdarray: fancyIdarray},
            type: 'post',
            dataType: 'json',
            beforeSend: function (jqXHR) {
                xhrPool.push(jqXHR);
            },
            success: function (output)
            {
                getScore = 0;
                if(output.cls == ''){
                    $('.market-listing-table td').removeClass('betting-disabled');
                }
                else {
                    $('.market-listing-table td').addClass('betting-disabled');
                }
                if (output.MatchOddsVolVal)
                {
                    $.each(output.MatchOddsVolVal, function (ind, matchResult) {
                        $.each(matchResult, function (key, result) {
                            var MarketID = result.MarketID;
                            var MatchId = result.MatchId;
                            var MId = MarketID.replace('.', '');
                            if (result.result != 0 || result.active == 0 || result.marketActive == 0) {
                                if ((result.active == 0 || result.marketActive == 0) && result.result == 0) {
                                    $(".matchClosedBox_" + MId + " .match-colsed").text('SUSPENDED');
                                    $(".matchClosedBox_" + MId + " h1").text('SUSPENDED');
                                }
                                $(".matchClosedBox_" + MId).show();
                                $(".matchOpenBox_" + MId).hide();
                            } else if ((result.is_show == 'N' || result.marketShow == 0) && !$(".onverlay" + MId).hasClass("overlay-table")) {
                                $("<div class='overlay-table onverlay" + MId + "'><span>Betting not open.</span></div>").insertBefore(".matchTable" + MId);
                            } else if ((result.is_show == 'Y' && result.marketShow == 1) && $(".onverlay" + MId).hasClass("overlay-table")) {
                                $(".matchOpenBox_" + MId + " .overlay-table").remove();
                            } else {
                                runner = output.MarketRunner[MarketID];
                                if (runner != null) {
                                    if (runner.status == 'OPEN')
                                    {
                                        if (runner.inplay != '') {
                                            getScore = 1;
                                        }
                                        $.each(runner.runners, function (key1, runData) {
                                            $.each(output.betUserData[MarketID], function (bet, BetDdata) {
                                                if (BetDdata.isBack == 0 && runData.ex.availableToBack.length != 0) {
                                                    var Odds = parseFloat(BetDdata.Odds);
                                                    var price = parseFloat(runData.ex.availableToBack[0].price);
                                                    if (BetDdata.SelectionId == runData.selectionId && Odds <= price) {
                                                        updateUnMatchedData(BetDdata.MstCode, 0, BetDdata.MatchId, BetDdata.MarketId);
                                                    }
                                                } else if (BetDdata.isBack == 1 && runData.ex.availableToLay.length != 0) {
                                                    var Odds = parseFloat(BetDdata.Odds);
                                                    var price = parseFloat(runData.ex.availableToLay[0].price);
                                                    if (BetDdata.SelectionId == runData.selectionId && Odds >= price) {
                                                        updateUnMatchedData(BetDdata.MstCode, 1, BetDdata.MatchId, BetDdata.MarketId);
                                                    }
                                                }
                                            });
                                            if (runData.ex.availableToBack[0]) {
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToBack0_price_" + MId).text()) != runData.ex.availableToBack[0].price) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack0_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack0_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack0_price_" + MId).text(runData.ex.availableToBack[0].price);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack0_price_" + MId).text('');
                                            }
                                            if (runData.ex.availableToBack[1]) {
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToBack1_price_" + MId).text()) != runData.ex.availableToBack[1].price) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack1_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack1_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack1_price_" + MId).text(runData.ex.availableToBack[1].price, 2);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack1_price_" + MId).text('');
                                            }
                                            if (runData.ex.availableToBack[2]) {
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToBack2_price_" + MId).text()) != runData.ex.availableToBack[2].price) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack2_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack2_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack2_price_" + MId).text(runData.ex.availableToBack[2].price);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack2_price_" + MId).text('');
                                            }
                                            if (runData.ex.availableToLay[0]) {
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToLay0_price_" + MId).text()) != runData.ex.availableToLay[0].price) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay0_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay0_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay0_price_" + MId).text(runData.ex.availableToLay[0].price);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay0_price_" + MId).text('');
                                            }
                                            if (runData.ex.availableToLay[1]) {
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToLay1_price_" + MId).text()) != Math.round(runData.ex.availableToLay[1].price, 2)) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay1_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay1_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay1_price_" + MId).text(runData.ex.availableToLay[1].price, 2);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay1_price_" + MId).text('');
                                            }
                                            if (runData.ex.availableToLay[2]) {
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToLay2_price_" + MId).text()) != runData.ex.availableToLay[2].price) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay2_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay2_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay2_price_" + MId).text(runData.ex.availableToLay[2].price);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay2_price_" + MId).text('');
                                            }
                                            var volumnLimit = result.volumeLimit;
                                            if (runData.ex.availableToBack[0]) {
                                                v = getoddVolumn(runData.ex.availableToBack[0].size, volumnLimit);
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToBack0_size_" + MId).text()) != v) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack0_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack0_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack0_size_" + MId).text(v);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack0_size_" + MId).text('');
                                            }
                                            if (runData.ex.availableToBack[1]) {
                                                v = getoddVolumn(runData.ex.availableToBack[1].size, volumnLimit);
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToBack1_size_" + MId).text()) != v) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack1_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack1_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack1_size_" + MId).text(v);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack1_size_" + MId).text('');
                                            }
                                            if (runData.ex.availableToBack[2]) {
                                                v = getoddVolumn(runData.ex.availableToBack[2].size, volumnLimit);
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToBack2_size_" + MId).text()) != v) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack2_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToBack2_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack2_size_" + MId).text(v);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToBack2_size_" + MId).text('');
                                            }
                                            if (runData.ex.availableToLay[0]) {
                                                v = getoddVolumn(runData.ex.availableToLay[0].size, volumnLimit);
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToLay0_size_" + MId).text()) != v) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay0_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay0_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay0_size_" + MId).text(v);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay0_size_" + MId).text('');
                                            }
                                            if (runData.ex.availableToLay[1]) {
                                                v = getoddVolumn(runData.ex.availableToLay[1].size, volumnLimit);
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToLay1_size_" + MId).text()) != v) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay1_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay1_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay1_size_" + MId).text(v);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay1_size_" + MId).text('');
                                            }
                                            if (runData.ex.availableToLay[2]) {
                                                v = getoddVolumn(runData.ex.availableToLay[2].size, volumnLimit);
                                                if ($.trim($("#" + runData.selectionId + "_" + key1 + "availableToLay2_size_" + MId).text()) != v) {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay2_price_" + MId).addClass("yello");
                                                } else {
                                                    $("." + runData.selectionId + "_" + key1 + "availableToLay2_price_" + MId).removeClass("yello");
                                                }
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay2_size_" + MId).text(v);
                                            } else {
                                                $("#" + runData.selectionId + "_" + key1 + "availableToLay2_size_" + MId).text('');
                                            }
                                        });
                                    } else if (runner.status == 'SUSPENDED') {
                                        $(".matchClosedBox_" + MId).show();
                                        $(".matchOpenBox_" + MId).hide();
                                        $(".matchClosedBox_" + MId + " .match-colsed").text('SUSPENDED');
                                        $(".matchClosedBox_" + MId + " h1").text('SUSPENDED');
                                    } else {
                                        $(".matchClosedBox_" + MId).show();
                                        $(".matchOpenBox_" + MId).hide();
                                    }
                                } else {
                                    $(".matchClosedBox_" + MId).show();
                                    $(".matchOpenBox_" + MId).hide();
                                }
                            }
                        });
                    });
                }
                if (output.fancyData) {
                    //alert(output.fancyData.length);				
                    $.each(output.fancyData, function (indx, fanData) {
                        if (fanData.length > 0) {
                            $("#fbox" + indx).show();
                            $.each(fanData, function (key, fancy) {
                                var checkClose = 0;
                                if ($("#fancyM_" + indx + " .block_box").length > fanData.length) {
                                    var getKeys = fanData.map(function (d) {
                                        return d['ID'];
                                    });
                                    //console.log(getKeys);
                                    $('.f_m_' + indx).each(function () {
                                        var fanc_id = $(this).attr('data-id');
                                        //console.log(fanc_id);
                                        var index = getKeys.indexOf(fanc_id);
                                        //console.log(index);
                                        if (index == -1) {
                                            $(".fancy_" + fanc_id).remove();
                                        }
                                    });
                                }
                                if ($(".fancy_" + fancy.ID).length) {
                                    if (fancy.active == 1 && fancy.cron_status == 1) {
                                        $(".show_msg_box_" + fancy.ID).removeClass("ball-msg-box");
                                        $(".show_msg_box_" + fancy.ID).html(' ');
                                    } else {
                                        $(".show_msg_box_" + fancy.ID).addClass("ball-msg-box");
                                        if (fancy.active == '2') {
                                            $(".show_msg_box_" + fancy.ID).html('<h1>Closed</h1>');
                                        } else if (fancy.active == '4') {
                                            $(".show_msg_box_" + fancy.ID).html('<h1>' + fancy.DisplayMsg + '</h1>');
                                        } else {
                                            //if(fancy.DisplayMsg !== null && fancy.DisplayMsg !== '') {
                                            if (fancy.DisplayMsg) {
                                                $(".show_msg_box_" + fancy.ID).html('<h1>' + fancy.DisplayMsg + '</h1>');
                                            } else {
                                                $(".show_msg_box_" + fancy.ID).html('<h1>Ball Started</h1>');
                                            }
                                        }
                                    }
                                    $("#fancy_name" + fancy.ID).text(fancy.HeadName);
                                    // console.log(fancy);
                                    //$(".fancyLia"+fancy.ID).text(Math.abs(fancy.liability));
                                    $("#LayNO_" + fancy.ID).text(fancy.SessInptNo);
                                    $("#BackYes_" + fancy.ID).text(fancy.SessInptYes);
                                    $("#NoValume_" + fancy.ID).text(fancy.NoValume);
                                    $("#YesValume_" + fancy.ID).text(fancy.YesValume);
                                    $("#pointDiff_" + fancy.MFancyID).val(fancy.pointDiff);
                                    $("#MFancyID_" + fancy.MFancyID).val(fancy.MFancyID);
                                } else {
                                    if (userType1 != 3) {
                                        var fancyhtml = '<div class="block_box f_m_' + fancy.MatchID + ' fancy_' + fancy.ID + '" data-id="' + fancy.ID + '"><ul class="sport-high fancyListDiv"><li><div class="ses-fan-box"><table class="table table-striped  bulk_actions"><tbody><tr class="session_content"><td><span class="fancyhead' + fancy.ID + '" id="fancy_name' + fancy.ID + '">' + fancy.HeadName + '</span><b class="fancyLia' + fancy.ID + '"></b><p class="position_btn" onclick="getPosition(' + fancy.ID + ')"><button class="btn btn-xs btn-danger">Book</button></p></td> <td></td><td></td><td class="fancy_lay" onclick="betfancy(' + fancy.MatchID + ',' + fancy.ID + ',' + fancy.SessInptYes + ',' + fancy.SessInptNo + ',' + fancy.pointDiff + ',' + fancy.MFancyID + ',1);"><button class="lay-cell cell-btn" id="LayNO_' + fancy.ID + '" >' + fancy.SessInptNo + '</button><button id="NoValume_' + fancy.ID + '"  class="disab-btn">100</button></td><td class="fancy_back" onclick="betfancy(' + fancy.MatchID + ',' + fancy.ID + ',' + fancy.SessInptYes + ',' + fancy.SessInptNo + ',' + fancy.pointDiff + ',' + fancy.MFancyID + ',0);"><button class="back-cell cell-btn" id="BackYes_' + fancy.ID + '" >' + fancy.SessInptYes + '</button><button id="YesValume_' + fancy.ID + '"  class="disab-btn">100</button></td> <td></td><td></td></tr></tbody></table><input type="hidden" name="text" id="pointDiff_' + fancy.ID + '" value="' + fancy.pointDiff + '"><input type="hidden" name="text" id="MFancyID_' + fancy.ID + '" value="' + fancy.MFancyID + '">';
                                        if (fancy.active == 0) {
                                            if (fancy.DisplayMsg != '') {
                                                fancyhtml += '<div class="ball-msg-box show_msg_box_' + fancy.ID + '"> <h1>' + fancy.DisplayMsg + '</h1></div>';
                                            } else {
                                                fancyhtml += '<div  class="ball-msg-box show_msg_box_' + fancy.ID + '"><h1>Ball Started</h1></div>';
                                            }
                                        } else if (fancy.active == 2 || fancy.active == 4) {
                                            fancyhtml += '<div class="ball-msg-box show_msg_box_' + fancy.ID + '"> <h1>' + fancy.DisplayMsg + '</h1></div>';
                                        } else {
                                            fancyhtml += '<div class=" show_msg_box_' + fancy.ID + '"></div>';
                                        }
                                        fancyhtml += '</div></li></ul></div>';
                                    } else {
                                        var fancyhtml = '<div class="block_box f_m_' + fancy.MatchID + ' fancy_' + fancy.ID
                                                + '" data-id="' + fancy.ID + '"><table class="market-listing-table apl-table">' +
                                                '<tr><td><div class="event-name fancyhead' + fancy.ID + '">' + fancy.HeadName + '</div>' +
                                                '<div class="book_match">' +
                                                '<a href="javascript:void(0);" onclick="getPosition(' + fancy.ID + ')">' +
                                                'Book</a></div></td><td colspan="2" class="odds-placeholder">' +
                                                '&nbsp;</td><td class="lay betting-pink" onclick="betfancy_user(' + fancy.MatchID
                                                + ',' + fancy.ID + ',' + fancy.SessInptYes + ',' + fancy.SessInptNo + ','
                                                + fancy.pointDiff + ',' + fancy.MFancyID + ',1);"><span id="LayNO_'
                                                + fancy.ID + '"><strong class="odds ng-binding">' + fancy.SessInptNo
                                                + '</strong></span><div class="size" id="NoValume_' + fancy.ID
                                                + '"><span class="ng-binding">' + fancy.NoValume + '</span>' + '</div></td>'
                                                + '<td class="back betting-blue" onclick="betfancy_user(' + fancy.MatchID + ','
                                                + fancy.ID + ',' + fancy.SessInptYes + ',' + fancy.SessInptNo + ','
                                                + fancy.pointDiff + ',' + fancy.MFancyID + ',0);"><span id="BackYes_'
                                                + fancy.ID + '"><strong class="odds ng-binding">' + fancy.SessInptYes
                                                + '</strong></span><div class="size" id="YesValume_' + fancy.ID
                                                + '"><span class="ng-binding">' + fancy.YesValume + '</span>' +
                                                '</div></td><td colspan="2" class="odds-placeholder">' +
                                                '<span class="max-liability ng-binding ng-scope">Max Bet: 1,950</span>' +
                                                '<span class="max-liability ng-binding ng-scope">Max Mkt: 9,750</span></td></tr>' +
                                                '</table><input type="hidden" name="text" id="pointDiff_' + fancy.ID + '" value="'
                                                + fancy.pointDiff + '"><input type="hidden" name="text" ' + 'id="MFancyID_'
                                                + fancy.ID + '" value="' + fancy.MFancyID + '">';
                                        if (fancy.active == 0) {
                                            if (fancy.DisplayMsg != '') {
                                                fancyhtml += '<div class="ball-msg-box show_msg_box_' + fancy.ID + '"> <h1>'
                                                        + fancy.DisplayMsg + '</h1></div>';
                                            } else {
                                                fancyhtml += '<div  class="ball-msg-box show_msg_box_' + fancy.ID + '"><h1>Ball ' +
                                                        'Started</h1></div>';
                                            }
                                        } else if (fancy.active == 2 || fancy.active == 4) {
                                            fancyhtml += '<div class="ball-msg-box show_msg_box_' + fancy.ID + '"> <h1>'
                                                    + fancy.DisplayMsg + '</h1></div>';
                                        } else {
                                            fancyhtml += '<div class=" show_msg_box_' + fancy.ID + '"></div>';
                                        }
                                        fancyhtml += '</div>';
                                    }
                                    $("#fancyM_" + fancy.MatchID).append(fancyhtml);
                                }
                            });
                        } else {
                            $("#fbox" + indx).hide();
                            $(".f_m_" + indx).remove();
                        }
                    });
                }
            },
            complete: function (jqXHR, textStatus) {
                xhrPool = $.grep(xhrPool, function (x) {
                    return x != jqXHR
                });
            }
        });
    }
}
function getoddVolumn(volmn, limit) {
    return (parseFloat(volmn) * parseFloat(limit)).toFixed(2);
}
function saveMatchoddsResult(myarray, matchIdarray, market_id, matchId, selectionId, spartName) {
    var marketData = {
        Match_id: matchId,
        market_id: market_id,
        selectionId: selectionId,
        isFancy: 1,
        spartName: spartName
                //selectionName: selectionName
    }
    // url: 'Geteventcntr/SetResult/',
    $.ajax({
        url: site_url + 'Geteventcntr/SetMatchResultUser',
        data: marketData,
        type: 'post',
        dataType: 'json',
        success: function (output)
        {
            $(".matchClosedBox_" + matchId).show();
            $(".matchOpenBox_" + market_id).hide();
            /*
             var index = myarray.indexOf(market_id.toString());
             if(index > -1){
             myarray.splice(index, 1);
             }
             var index = matchIdarray.indexOf(matchId.toString());
             if(index > -1){
             matchIdarray.splice(index, 1);
             } */
        }
    });
}
function  upcommingMatchData() {
    var urlPage = document.URL;
    abortAjax();
    $.ajax({
        url: site_url + 'user/dashboardView',
        data: {url: urlPage},
        type: 'get',
        dataType: 'html',
        success: function (output)
        {
            $("#UpCommingData").show();
            $("#UpCommingData").html(output);
            $("#MatchOddInfo").html('');
        }
    });
}
function GetTennisScoreApi(matchId){
	 
	var  currentBet = matchId;
	 
	  var hyml = '<iframe ng-if="livestream.data.autoPlay" ng-src="https://videoplayer.betfair.com/GetPlayer.do?tr=1&amp;eID='+currentBet+'&amp;width=100%&amp;height=188&amp;allowPopup=true&amp;contentType=viz&amp;statsToggle=hide&amp;contentOnly=true" width="100%" height="188" scrolling="no" src="https://videoplayer.betfair.com/GetPlayer.do?tr=1&amp;eID='+currentBet+'&amp;width=100%&amp;height=188&amp;allowPopup=true&amp;contentType=viz&amp;statsToggle=hide&amp;contentOnly=true"></iframe>';
	alert(hyml);
	console.log(hyml);
	$("#tennisScore").html(hyml); 
	 
}
function GetScoreApi(matchId) {
    //alert(getScore);
    if (getScore == 1 && isBet == 0) { 
        $.ajax({
            url: site_url + 'Geteventcntr/GetScoreApi',
            data: {matchId: matchId},
            type: 'post',
            dataType: 'html',
            beforeSend: function (jqXHR) {
                xhrPool.push(jqXHR);
            },
            success: function (output)
            { 
                if ($(window).width() < 780) {
                    $("#scoreMob").html(output);
                } else {
                    $("#matchScore_" + matchId).html(output);
                }
               
            },
            complete: function (jqXHR, textStatus) {
                xhrPool = $.grep(xhrPool, function (x) {
                    return x != jqXHR
                });
            }
        });
    }
}
function setChipStackVal() {
    $(".errmsg").text('');
    $("#Name1").val($(".chipName1").text());
    $("#Name2").val($(".chipName2").text());
    $("#Name3").val($(".chipName3").text());
    $("#Name4").val($(".chipName4").text());
    $("#Name5").val($(".chipName5").text());
    $("#Name6").val($(".chipName6").text());
    $("#Value1").val($(".chipName1").val());
    $("#Value2").val($(".chipName2").val());
    $("#Value3").val($(".chipName3").val());
    $("#Value4").val($(".chipName4").val());
    $("#Value5").val($(".chipName5").val());
    $("#Value6").val($(".chipName6").val());
}
function checkLogin() {
    if (isBet == 0) {
        $.ajax({
            url: site_url + 'user/statusChecklogin/',
            dataType: 'JSON',
            beforeSend: function (jqXHR) {
                xhrPool.push(jqXHR);
            },
            success: function (output)
            {
                if (output.logout == 1) {
                    location.reload();
                } else {
                    $("#liveCommentary").text(output.val);
                }
            },
            complete: function (jqXHR) {
                xhrPool = $.grep(xhrPool, function (x) {
                    return x != jqXHR
                });
                if (jqXHR.status == 302) {
                    location.reload();
                }
            }
        });
    }
}
$(document).on('click', '.slider-menu-back', function (e) {
    $('nav').attr('data-left','0%');
    $('nav').removeAttr('style');    
    $("#matchId_"+currentBet).parent().removeClass("slider-menu-active");
    myarray = [];
    $("#MatchOddInfo").hide();
    $("#UpCommingData").show();
    $('#tennisMatchList').show();
    $('#soccerMatchList').show();
    $('#cricketMatchList').show();
});