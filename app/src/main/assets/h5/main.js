new VConsole();

$(function(){
    
	// 内置桥接对象
	console.log(JsBridge)
	
	
	$("#btn1").click(function(){
		// 获取所有key值，返回数组格式的JSON字符串
	    var result=JsBridge.allKeys();
	    console.log("result:",JSON.parse(result))
		$("#result").text(result||"")
	
	});

	$("#btn2").click(function(){
	    var key=$("#key").val();
	    if(!key) return alert("key 不能为空");

		// 通过key值获取value值，返回字符串
        var result=JsBridge.findValue(key);
        console.log("result:",result)
        $("#result").text(result||"")
    })

    $("#btn3").click(function(){
        var key=$("#key").val();
        if(!key) return alert("key 不能为空");

        var value=$("#value").val();
        if(!value) return alert("value 不能为空")

		// 保存key-value键值对，key与value类型必须是字符串。返回记录id，int类型。
        var result=JsBridge.saveValue(key,value);
        console.log("result:",result)
		$("#result").text(result||"")
    })

    $("#btn4").click(function(){
        var key=$("#key").val();
        if(!key) return alert("key 不能为空");

		// 通过key值删除value值。返回boolean值。
        var result=JsBridge.removeValue(key);
        console.log("result:",result)
		$("#result").text(result||"")
    })
})