$(document).ready(function () {
    if (isFav == 1) {
        $.each(favMAtches, function (keyNew, valueNew) {
            MarketSelection(valueNew, userId, userType, keyNew);
        });
    } else if (ParmesMarketId > 0) {
        MarketSelection(MarketId, userId, userType, matchId, );
    } else {
        //upcommingMatchData();
    }
    // HTML markup implementation, overlap mode
    $('#menu').multilevelpushmenu({
        containersToPush: [$('#pushobj')],
        menuWidth: '20%',
        menuHeight: '100%'
    });
    if ($(window).width() < 768) {
        $('#btnTogUsr').hide();
        $('#betSlipDivUsr').hide();
    } else {
        $('#btnTogUsr').show();
        $('#betSlipDivUsr').show();
    }
});
$(document).on('click', '#tvTab', function (e) {
    if ($(window).width() < 768) {
        $('.MatchTvHideDown').trigger('click');
    }
});
$(document).on('click', '.panel-heading span.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.balance-box').find('.balance-panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
		$('.balance-panel-body').css('display', 'block');
    } else {
        $this.parents('.balance-box').find('.balance-panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
		$('.balance-panel-body').css('display', 'none');
    }
});
$(window).resize(function () {
    $('#menu').multilevelpushmenu('redraw');
});
$(window).resize(function () {
    $('#menuMob').multilevelpushmenu('redraw');
});
$("#back").click(function () {
    $("#back-tab-betslip").show("slow");
});
$("#lay").click(function () {
    $("#lay-tab-betslip").show("slow");
});
$('#from-date').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    format: 'YYYY-MM-DD'
});
$('#to-date').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    format: 'YYYY-MM-DD'
});
$('.nav-tabs a').click(function () {
    $(this).tab('show');
});
$('#updateUserStake').click(function () {
    var datastring = $("#userStakeUpdate").serialize();
    $.ajax({
        type: "POST",
        url: site_url + 'Createdealercontroller/updateUserChipSetting_user/',
        data: datastring, //only input
        cache: false,
        dataType: 'json',
        success: function (output)
        {
            if (output.status.error == 0) {
                $('#resMsg').attr('style', 'text-align: center;color: green;margin-top: 10px;');
                $("#resMsg").html("<span class='succmsg'>" + output.status.message + "</span>");
                $("#resMsg").fadeOut(3000);
                $(".chipName1").text($("#Name1").val());
                $(".chipName2").text($("#Name2").val());
                $(".chipName3").text($("#Name3").val());
                $(".chipName4").text($("#Name4").val());
                $(".chipName5").text($("#Name5").val());
                $(".chipName6").text($("#Name6").val());
                $(".chipName1").val($("#Name1").val());
                $(".chipName2").val($("#Name2").val());
                $(".chipName3").val($("#Name3").val());
                $(".chipName4").val($("#Name4").val());
                $(".chipName5").val($("#Name5").val());
                $(".chipName6").val($("#Name6").val());
                setTimeout(function () {
                    $("#exampleModal").modal('hide');
                }, 3000);
            } else {
                $('#resMsg').attr('style', 'text-align: center;color: red;margin-top: 10px;');
                $("#resMsg").html("<span class='errmsg'>" + output.status.message + "</span>");
                $("#resMsg").fadeOut(3000);
            }
        }
    });
});
$('#editUsrStake').click(function () {
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
    /*  var userId = $("#userId").val();
     $.ajax({
     url: site_url + 'useraction/UserChipSetting/' + userId,
     data: {userId: userId},
     type: 'post',
     dataType: 'json',
     success: function (output)
     {
     console.log(output);
     if (output.getChipsetting[0]) {
     $("#Name1").val(output.getChipsetting[0].Value1);
     $("#Name2").val(output.getChipsetting[0].Value2);
     $("#Name3").val(output.getChipsetting[0].Value3);
     $("#Name4").val(output.getChipsetting[0].Value4);
     $("#Name5").val(output.getChipsetting[0].Value5);
     $("#Name6").val(output.getChipsetting[0].Value6);
     }
     }
     }); */
});
$(".dropd").change(function () {
    var dval = $(this).val();
    if (dval == 5) {
        window.location.href = site_url + 'report/profitloss';
    }
});
function openNav() {
    document.getElementById("mySidenav").style.width = "230px";
    document.getElementById(".slider").style.marginLeft = "";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById(".slider").style.marginLeft = "0";
}
function useropenNav() {
    document.getElementById("usernav").style.width = "250px";
    document.getElementById("usermain").style.marginLeft = "250px";
}
function usercloseNav() {
    document.getElementById("usernav").style.width = "0";
    document.getElementById("usermain").style.marginLeft = "0";
}
function SetPosition(priceVal) {
//var matchid = $("#matchId").val();
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
//alert("curr"+curr);
//10301_maxprofit_loss_runner0
        var currV = Math.round(curr);
        $("#" + selecid + "_maxprofit_loss_runner_" + MId).text(Math.abs(currV)).css('color', getValColor(currV));
        /* if(i == 0){			
         $("#profitData").text(Math.round(curr));
         } */
    });
}
function ClearAllSelection(hide = 1) {
    $("#stakeValue").val(0);
    //var matchid = $("#matchId").val();
    var MarketId = $("#MarketId").val();
    var MId = MarketId.replace('.', '');
    $(".position_" + MId).each(function (i) {
        var selecid = $(this).attr('data-id');
        var winloss = parseFloat($(this).val());
        $("#" + selecid + "_maxprofit_loss_runner_" + MId).text(Math.abs(winloss)).css('color', getValColor(winloss));
    });
    $("#profitData").text(0.00);
    $("#LossData").text(0.00);
    if (hide == '1') {
        // $(".betBox").hide();
        $("#betslip").hide();
    } else {
        // $(".betBox").show();
        $("#betslip").show();
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
    $("#profitData").text(0.00);
    $("#LossData").text(0.00);
}
function calMaxProfitLoss(formData) {
    var profit_max = 0;
    var loss_max = 0;
    var arrayText1 = [];
    var MId = formData.MarketId.replace('.', '');
    $(".position_" + MId).each(function (i) {
        var selecid = $(this).attr('data-id');
        var winloss = parseFloat($(this).val());
        var curr = 0;
        if (formData.selectionId == selecid) {
            if (formData.isback == 0) {
                curr = winloss + ((formData.priceVal * formData.stake) - formData.stake);
            } else {
                curr = winloss + (-1 * ((formData.priceVal * formData.stake) - formData.stake));
            }
        } else {
            if (formData.isback == 0) {
                curr = winloss + (-1 * (formData.stake));
            } else {
                curr = winloss + formData.stake;
            }
        }
        arrayText1.push(curr);
        //alert("New Pnl Value" + curr);
        if (curr >= 0 && curr > profit_max) {
            profit_max = curr;
        } else if (curr < 0 && curr < loss_max) {
            loss_max = curr;
        }
    });
    var minVal1 = Math.min.apply(Math, arrayText1.map(function (item) {
        return item;
    }));
    SlMaxProfitLoss = {
        profit_max: profit_max,
        loss_max: loss_max,
        minVal1: minVal1
    }
    return SlMaxProfitLoss;
}
function getSumValPnL(a, b) {
    if (a == '') {
        a = 0;
    }
    if (b == '') {
        b = 0;
    }
    return (parseFloat(a) + parseFloat(b));
}
function totalgetval(TeamData, formData) {
    var TotalGetVal = 0;
    if (TeamData != '') {
        for (var i = 0; i < TeamData.length; i++) {
            if (TeamData[i].matchId != formData.matchId) {
                /**** Kajal 1/2/18 ****/
                TeamData[i].TeamA = parseFloat(TeamData[i].TeamA);
                TeamData[i].TeamB = parseFloat(TeamData[i].TeamB);
                TeamData[i].theDraw = parseFloat(TeamData[i].theDraw);
                if ((TeamData[i].TeamA < TeamData[i].TeamB) && ((TeamData[i].TeamA < TeamData[i].theDraw))) {
                    if (TeamData[i].TeamA >= 0) {
                    } else {
                        TotalGetVal = getSumValPnL(TotalGetVal, parseFloat(TeamData[i].TeamA).toFixed(2));
                    }
                } else if ((TeamData[i].TeamB < TeamData[i].TeamA) && ((TeamData[i].TeamB < TeamData[i].theDraw))) {
                    if (TeamData[i].TeamB >= 0) {
                    } else {
                        TotalGetVal = getSumValPnL(TotalGetVal, parseFloat(TeamData[i].TeamB).toFixed(2));
                    }
                } else {
                    if (TeamData[i].theDraw >= 0) {
                    } else {
                        TotalGetVal = getSumValPnL(TotalGetVal, parseFloat(TeamData[i].theDraw).toFixed(2));
                    }
                }
            }
        }
    }
    return TotalGetVal;
}
function set_runnerData(RunnerValue) {
    $.each(RunnerValue, function (key, value) {
        $.each(RunnerValue[key], function (keyNew, valueNew) {
            var minvalue = valueNew.winValue;
            var selectionId = valueNew.SelectionId;
            $("#" + selectionId + "_maxprofit_loss_runner").text(Math.abs(minvalue)).css('color', getValColor(minvalue));
        });
    });
}
function getApiFrom(formData)   //profitData
{
    abortAjax();
    $.ajax({
        method: 'POST',
        url: site_url + 'useraction/Save_bet/',
        data: formData,
        dataType: 'json',
        async: false,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: function (data)
        {
            currBet = 0;
            $(".loader").hide();
            ClearAllSelection(1);
            $(".CommanBtn").attr("disabled", false);
            if (data.error == '1') {
                new PNotify({
                    title: 'Error',
                    text: data.message,
                    type: 'error',
                    styling: 'bootstrap3',
                    delay: 3000
                });
            } else {
                currentMatchBet = currentMatchBet + 1;
                //$(".loader").hide();
                $(".UserLiability").text(data.ChipData.Liability);
                $(".Wallet").text(data.ChipData.Balance);
                $(".FreeChip").text(data.ChipData.FreeChip);
                $(".Chip").text(data.ChipData.Chip);
                MId = formData.MarketId.replace('.', '');
                $.each(data.RunnerValue, function (keyNew, valueNew) {
                    var minvalue = parseFloat(valueNew.winValue);
                    var lossValue = parseFloat(valueNew.lossValue);
                    var selectionId = valueNew.SelectionId;
                    var newVal = minvalue + lossValue;
                    $("#" + selectionId + "_maxprofit_loss_runner_" + MId).text(Math.abs(newVal)).css('color', getValColor(newVal));
                });
                setBetData(formData.MarketId, formData.matchId);
                new PNotify({
                    title: 'Success',
                    text: data.message,
                    type: data.notifytype,
                    styling: 'bootstrap3',
                    delay: 3000
                });
            }
        }
    });
}
function PlaceBet() {
    curBet = 1;
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
        curBet = 0;
        $("#stakeValue").val(0);
        $("#profitData").text('');
        $("#LossData").text('');
        return false;
    } else if (!$.isNumeric(stake) || stake < 1) {
        new PNotify({
            title: 'Error',
            text: 'Invalid stake.',
            type: 'error',
            styling: 'bootstrap3',
            delay: 3000
        });
        curBet = 0;
        $("#stakeValue").val(0);
        $("#profitData").text('');
        $("#LossData").text('');
        return false;
    }
    $(".loader").show();
    $(".CommanBtn").attr("disabled", true);
    var MarketId = $("#MarketId").val();
    var matchId = $("#matchId").val();
    var userId = $("#userId").val();
    var stakeValue = parseInt($("#stakeValue").val());
    var P_and_l = (priceVal * stake) - stake;
    if (MarketId != '' && matchId != '' && userId != '')
    {
        abortAjax();
        /* $.ajax({
         url: site_url + 'Useraction/viewUserAcBetDelay/',
         type: "post",
         dataType: 'json',
         cache: false,
         async: false,
         success: function (output)
         { */
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
            isMatched: 0
        };
        //var BetDelay = (parseInt(output.viewUserAc2[0].set_timeout) * 1000);
        setTimeout(function () {
            getApiFrom(formData);
        }, 0);
        /* }      
         }); */
    } else {
        new PNotify({
            title: ' Error',
            text: 'Some Thing Went worng',
            type: 'error',
            styling: 'bootstrap3',
            delay: 3000
        });
        curBet = 0;
        $("#stakeValue").val(0);
        $("#profitData").text('');
        $("#LossData").text('');
        $(".CommanBtn").attr("disabled", false);
        $(".loader").hide();
    }
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
function PlaceFancy()
{
    abortAjax();
    var amount = parseFloat($("#stakeValue").val());
    var betOddValue = parseFloat($("#ShowBetPrice").val());
    if (!$.isNumeric(amount) || amount < 1 || !$.isNumeric(betOddValue) || betOddValue < 1) {
        new PNotify({
            title: 'Error',
            text: 'Invalid stake/odd',
            type: 'error',
            styling: 'bootstrap3',
            delay: 3000
        });
    } else {
        curBet = 1;
        $(".CommanBtn").attr("disabled", true);
        $(".loader").show();
        var sessionData = {
            betValue: amount,
            betOddValue: betOddValue,
            FancyID: $("#isfancy").val(),
            matchId: $("#matchId").val(),
            OddValue: $('#isback').val(),
            HeadName: $('#placeName').val(),
            FancyId: $('#mfancyid').val(),
            pointDiff: $('#pointDiff').val(),
            deviceInformation: ''
        };
        /* $.ajax({
         url: site_url +'Useraction/viewUserAcBetDelay/',
         type: "POST",
         dataType: 'json',
         async: false,
         success: function (output)
         {
         var BetDelay = (parseInt(output.viewUserAc2[0].fancy_set_timeout) * 1000); */
        setTimeout(function () {
            //alert("sd");
            $.ajax({
                url: site_url + 'useraction/fancybet/',
                type: "POST",
                data: sessionData,
                dataType: 'json',
                async: false,
                success: function (data)
                {
                    curBet = 0;
                    $(".CommanBtn").attr("disabled", false);
                    $(".loader").hide();
                    //alert(data.error);
                    ClearAllSelection(1);
                    if (data.error == 0) {
                        $(".UserLiability").text(data.cipsData.Liability);
                        $(".Wallet").text(data.cipsData.Balance);
                        $(".FreeChip").text(data.cipsData.FreeChip);
                        $(".Chip").text(data.cipsData.Chip);
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
                            text: data.message,
                            type: 'error',
                            styling: 'bootstrap3',
                            delay: 3000
                        });
                    }
                }
            });
        }, 0);
        /* }
         });	 */
    }
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
        } else {
            $("#betslip").show();
            $(".betBox").show();
        }
    }
}
function getOddValue_user(priceVal, matchId, marketId, back_layStatus, placeName, selectionId, className) {
    //alert($('.'+className).hasClass('betting-disabled'));
    if (userType1 == 3 && $('.' + className).hasClass('betting-disabled') === false) {
        //alert(priceVal+' '+matchId+' '+marketId+' '+back_layStatus+' '+placeName+' '+selectionId+' '+className);
// checking  is direct bettting is on than place direct bet to user
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
            // getBets(matchId, marketId);
            //setBetData(marketId, matchId);
            if ($(window).width() < 780)
            {
                $("#betslip").insertAfter('#' + selectionId + '_row');
                // $('.betSlipBox .mod-header').insertBefore('#placeBetSilp');
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
            //setChipStackVal();
            calc();
            //PlaceBet();                
        }
    }
}
function ShowBet(userId, matchId, MarketId, type) {
    window.location.href = site_url + "report/showbet/" + userId + '/' + matchId + '/' + MarketId + '/' + type;
}
function ShowMatchFancy(userId, matchId, MarketId, type) {
    window.location.href = site_url + "report/fancy_profitloss/" + userId + '/' + matchId + '/' + MarketId + '/' + type;
}
function clearSearch(url) {
    window.location.href = url;
}
function setBetData(MarketId, matchId) {
    $.ajax({
        url: site_url + 'Geteventcntr/setBetData/' + MarketId + '/' + matchId,
        type: 'get',
        dataType: 'html',
        success: function (output)
        {
            if ($(window).width() < 768) {
                $("#openbetsMob").html(output);
                var MatchCnt = $(".match_bets .content_user_table").length;
                var unMatchCnt = $(".UnMachShowHide .content_user_table").length;
                $('#betCnt').html('(M-' + MatchCnt + ',U-' + unMatchCnt + ')');
            } else {
                $("#betData").html(output);
            }
        }
    });
}
function filterSport(sportId, isDashboard) {
    if (isDashboard === 0) {
        switch (sportId) {
            case '4':
                $('#tennisMatchList').hide();
                $('#soccerMatchList').hide();
                break;
            case '2':
                $('#cricketMatchList').hide();
                $('#soccerMatchList').hide();
                break;
            case '1':
                $('#tennisMatchList').hide();
                $('#cricketMatchList').hide();
                break;
        }
    } else {
        window.location.href = site_url + "User/dashboard";
    }
}
function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh);
}
function display_ct() {
    var x = new Date();
    var yr = x.getFullYear();
    var mnth = x.getMonth();
    var dt = x.getDate();
    var hr = x.getHours();
    var mi = (x.getMinutes() < 10 ? '0' : '') + x.getMinutes();// x.getMinutes();
    var sec = (x.getSeconds() < 10 ? '0' : '') + x.getSeconds(); //x.getSeconds();
    var locale = "en-us";
    var mn = x.toLocaleString(locale, {month: "long"});
    mn = mn.substring(0, 3);
    //document.getElementById('ct').innerHTML = x;
    document.getElementById('dt').innerHTML = mn + ' ' + dt + ', ' + yr;
    document.getElementById('tm').innerHTML = hr + ':' + mi + ':' + sec;
    display_c();
}
function changetv(id, sr) {
    if (sr == 1 || $(".MatchTvHideShow").is(':empty'))
    {
        $.ajax({
            url: site_url + 'User/gettv/' + id,
            dataType: 'html',
            success: function (output)
            {
                $(".MatchTvHideShow").html(output);
            }
        });
    }
}
( function( $ ) {
  $( function() {
    $( '.my-menu' ).sliderMenu();
  });
})( jQuery );