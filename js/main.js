$(document).ready(function(){

    var  expression = {
        };

    expression.takeExpression = function() {
        this.b = 0;
        this.sum = 0;

        this.a = Math.round(6 - 0.5 + (Math.random() * (9 - 6 + 1)));//[6,9]

        while(!(this.sum >= 11 && this.sum <= 14)){
            this.b = Math.round(2 - 0.5 + (Math.random() * (8 - 2 + 1)));//[2,8]
            this.sum = this.a + this.b;
        }

        $(".sum .a").html(this.a); 
        $(".sum .b").html(this.b);
    }

    expression.visualA = function(){
        var arrow_1 = document.getElementById("arrow_1");
            ctx = arrow_1.getContext('2d'),
            d = this.d = this.a * 39.2 + 35,
            d2 = this.d2 = d + this.b*39.2;

        //Окружность через круг(не доведена до ума)
        // arrow_1.height = 1000;
        // arrow_1.width = 875;
        // ctx.beginPath();
        // ctx.arc(x, y, r, 33/4 * Math.PI, 1/4 * Math.PI, true);
        // ctx.stroke(); // *14
        // ctx.strokeStyle = "red"
        // ctx.fillStyle = "#FFA500"
        // console.log(this.a*40/2);
        // console.log(y);

        //Окружность через Безье 
        arrow_1.height = 100;
        arrow_1.width  = 875;
        ctx.beginPath();
        ctx.moveTo(35, 80);
        ctx.quadraticCurveTo(d/2, 0, d, 80);
        ctx.lineTo(d-20,77);
        ctx.moveTo(d,80);
        ctx.lineTo(d-14,65);
        ctx.strokeStyle = 'red';
        ctx.stroke();

        $(".sl1").css({
            "left":d/2,
            "display":"block"
        });
    }

    expression.visualB = function(){
        var arrow_2 = document.getElementById("arrow_2");
            ctx = arrow_2.getContext('2d'),
            d = this.d2;

        //Окружность через Безье 
        arrow_2.height = 100;
        arrow_2.width  = 875;
        ctx.beginPath();
        ctx.moveTo(this.d, 80);
        ctx.quadraticCurveTo(d/2+this.d/2, 40, d, 80);
        ctx.lineTo(d-20,77);
        ctx.moveTo(d,80);
        ctx.lineTo(d-14,65);
        ctx.strokeStyle = 'red';
        ctx.stroke();

        $(".sl2").css({
            "left":d/2+this.d/2-15,
            "display":"block"
        });
    }

    $(".axis .sl1").keyup(function(){
        if($(this).val() != expression.a){
            $(this).addClass("warring");
            $(".sum .a").addClass("wrong");
        }else{
            $(".axis .sl1").replaceWith("<div class='sl1'>"+expression.a+"</div>");
            $(".axis .sl1").css({
                "display":"block",
                "left":expression.d/2,
            });
            $(".sum .a").removeClass("wrong");
            expression.visualB();
        }
    });

    $(".axis .sl2").keyup(function(){
        if($(this).val() != expression.b){
            $(this).addClass("warring");
            $(".sum .b").addClass("wrong");
        }else{
            $(".axis .sl2").replaceWith("<div class='sl2'>"+expression.b+"</div>");
            $(".axis .sl2").css({
                "display":"block",
                "left":expression.d/2+expression.d2/2-15,
            });
            $(".sum .b").removeClass("wrong");
            $(".sum div.answer").remove();
            $(".sum input.answer").css("display","inline-block");
        }
    });


    $(".answer").keyup(function(){
        if($(this).val() != expression.sum){
            $(this).addClass("warring");
        }else{
            $(this).replaceWith("<div>"+expression.sum+"</div>");
            $(".sum div:last-child").addClass("right");
        }
    });

    expression.takeExpression();
    expression.visualA();
});