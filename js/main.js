$(function(){
    $("#inputpostcode").on('blur',  function(){
        var errorTexts = [];
        var count = $('#inputpostcode').val().length;

        if(!$("#inputpostcode").val().match(/^[0-9\-]+$/)){/*お電話番号が数字とハイフン以外が用いられていた時の場合*/
            errorTexts.push("郵便番号には半角数字かハイフン(-)を用いてください。");
            if(errorTexts.length > 0){//リストに追加したテキストをhtmlに表示する
                $(".alart-text1").html(errorTexts.join("<br />"));
                /*window.scroll({
                    top: 0,
                    behavior: "smooth",
                })*/
            }
        }else if(count > 8){/*郵便番号が8桁を超えた時*/
            errorTexts.push("適切な郵便番号を入力してください");
            if(errorTexts.length > 0){//リストに追加したテキストをhtmlに表示する
                $(".alart-text1").html(errorTexts.join("<br />"));
                /*window.scroll({
                    top: 0,
                    behavior: "smooth",
                })*/
            }
        }else if(count < 7){
            errorTexts.push("適切な郵便番号を入力してください");
            if(errorTexts.length > 0){//リストに追加したテキストをhtmlに表示する
                $(".alart-text1").html(errorTexts.join("<br />"));
                /*window.scroll({
                    top: 0,
                    behavior: "smooth",
                })*/
            }
        };
    });

    $('#search').on('click', function() {

        $.getJSON('http://zipcloud.ibsnet.co.jp/api/search?callback=?',
            {
            zipcode: $('#inputpostcode').val()
            }
        )
        .done(function(data) {
            if (!data.results) {
                var notaddress = [];
                notaddress.push("該当する郵便番号がありません。");
                $(".alart-text2").html(notaddress.join("<br />"));
                /*window.scroll({
                    top: 0,
                    behavior: "smooth",
                })*/
            } else {
                let result = data.results[0];
                $('#receiveaddress').val("〒" + result.address1+result.address2+result.address3);
            }
        })
    });
    // クリアボタンを押すことで、フォームの中身を空にすることができる
    $('#clear').on('click', function(){
        $('#inputpostcode').val('');
        $('#receiveaddress').val('');
        $(".alart-text1").hide();//クリアボタンのクリックと同時にアラート文と前回の検索結果を消すようにする
        $(".alart-text2").hide();
        $(".text-display").hide();
    });

    $('#push').on('click', function() {
        var resultText = [];
        var resultaddress = [];
        resultText.push($('#inputpostcode').val());
        resultaddress.push($('#receiveaddress').val());

        if(resultText.length > 0){
            $(".postinput").html(resultText.join("<br />"));
            $(".addressinput").html(resultaddress.join("<br />"));
            $(".text-display").show();
        }
    })
});