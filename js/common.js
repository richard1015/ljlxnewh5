/* JavaScript Document */

/**********Instruction**********/
//=============================================================================
// @des:            js setFontSize files
// @author:       	chengwei
// @time:           2016-3-15
// @lastTime     	2016-3-15
// @version         0.1 beta
// ============================================================================

//初始化html字体大小为100px(iPhone6下)，可以自适应
$('html').css('font-size',$('html')[0].clientWidth/3.75);

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}