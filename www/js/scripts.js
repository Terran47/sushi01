
	// Initialize your app
	var myApp = new Framework7({
	    swipePanel:'left',
	    modalTitle:'Сообщение',
	    material: true
	});

	// Export selectors engine
	var $$ = Dom7;

	// Add view

	var mainView = myApp.addView('.view-main');

	var panelView = myApp.addView('.panel-view');

	mainView.router.loadPage('http://188.225.74.48/api/index');

	panelView.router.loadPage('http://188.225.74.48/api/panelSettings');


	$(document).on('click', '.bar-open i', function(){
		myApp.openPanel('left');
	});

	$(document).on('click', '.main-panel ul li span', function(){

		myApp.closePanel();

		var hrefLink = $(this).attr('data-url');

		mainView.router.loadPage(hrefLink);

	});

	var countProducts = 1;

	$(document).on('click', '.cart-plus-icon', function(){
		
		countProducts = $(this).parent().find('input.col-prodect-value').val();

		countProducts++;

		$(this).parent().find('input.col-prodect-value').val(countProducts);
	});

	$(document).on('click', '.cart-minus-icon', function(){
		countProducts = $(this).parent().find('input.col-prodect-value').val();

		countProducts--;
		$(this).parent().find('input.col-prodect-value').val(countProducts);

		if(countProducts < 1){	
			$(this).parent().find('input.col-prodect-value').val(1);
		}

	});


	//cart
	$(document).on('click', 'strong.button-add-cart', function(){

		var imgProdect = $(this).parent().parent().parent().find('img.product-img').attr('src');
		var nameProduct = $(this).parent().parent().find('h3.product-name').text();
		var descrtiptionProduct = $(this).parent().parent().find('p.product-decription').text();
		var priceProduct = $(this).parent().find('span.product-price').text();
		var countProduct = $(this).parent().find('input.col-prodect-value').val();
		var idProduct = $(this).attr('data-item-id');


		var jsonProduct = {
			name:nameProduct,
			description:descrtiptionProduct,
			image:imgProdect,
			price:parseInt(priceProduct),
			count:countProduct,
		};

		window.localStorage.setItem(idProduct,JSON.stringify(jsonProduct));
		haveProduct();
		updatecartContent();

	    myApp.addNotification({
	        message: 'В корзине',
	        button: {
	            text: 'ok',
	            color: 'white'
	        }
	    });

	});


	function updatecart(){

		var lengthStorage = window.localStorage.length;
		$(document).find('.main-count-products, .cart-count-block strong.text-count-products').html(lengthStorage);			

	}

	setInterval(updatecart, 1000);

	function haveProduct(){
		var lengthStorage = window.localStorage.length;
		var o = 0;
		var productInfo = '';
		var storageKey = 0;
		for(o; o < lengthStorage; o++){

			storageKey = window.localStorage.key(o);

			if(storageKey){

				productInfo = window.localStorage.getItem(storageKey);
				$('strong[data-item-id="'+storageKey+'"]').html('уже в корзине').addClass('addCart');
				productInfo = JSON.parse(productInfo);
				$('strong[data-item-id="'+storageKey+'"]').parent().find('input.col-prodect-value').val(productInfo.count);

			}else{
				$('strong[data-item-id="'+storageKey+'"]').parent().parent().parent().parent().parent().remove();
			}

		}
	}

	$(document).on('click', '.cart-back', function(){
		mainView.router.loadPage('http://188.225.74.48/api/index');
	});

	$$(document).on('click', '.cart-count-block', function() {
		mainView.router.loadPage('http://188.225.74.48/api/cart');
		updatePrice();
	});

	function updatecartContent(){

		$('.main-list-products-cart ul').html('');

		var lengthProducts = window.localStorage.length;
		var t = 0;
		var keyProduct = 0;
		var fullsumma = 0;
		var mainProduct = '';

		for(t; t < lengthProducts; t++){

			keyProduct = window.localStorage.key(t);
			mainProduct = JSON.parse(window.localStorage.getItem(keyProduct));
			fullsumma = fullsumma + (mainProduct.price * mainProduct.count);

			$('.main-list-products-cart ul').append('<li data-cart-product-id="'+keyProduct+'"><img src="'+mainProduct.image+'"><div class="clear-block"></div><h1>'+mainProduct.name+'</h1><p>'+mainProduct.description+'</p><div class="main-info-controll-block"><div class="row"><div class="col-50"><strong class="price-product-cart">цена: <b>'+mainProduct.price+'</b> тг.</strong><div class="clear-block"></div><strong class="product-cart-count">количество: <b>'+mainProduct.count+'</b></strong></div><div class="col-50"><div class="main-block-setting"><span><i class="fa fa-minus cart-setting-minus" aria-hidden="true"></i></span><span><i class="fa fa-plus cart-setting-plus" aria-hidden="true"></i></span><span><i class="fa fa-trash-o cart-setting-delete" aria-hidden="true"></i></span></div></div></div></div></li>');

		}

		$(document).find('.cart-count-block strong.main-summa-cart, .main-all-summa p strong').html(fullsumma);

	}

	updatecartContent();

	function updatePrice(){
		var lengthProducts = window.localStorage.length;
		var t = 0;
		var keyProduct = 0;
		var fullsumma = 0;
		var mainProduct = '';

		for(t; t < lengthProducts; t++){

			keyProduct = window.localStorage.key(t);
			mainProduct = JSON.parse(window.localStorage.getItem(keyProduct));
			fullsumma = fullsumma + (mainProduct.price * mainProduct.count);

		}

		if(lengthProducts > 0){
			$(document).find('.cart-page-content h5').html('Список продуктов');
		}else{
			$(document).find('.cart-page-content h5').html('Список продуктов чист.');
		}

		$(document).find('.cart-count-block strong.main-summa-cart, .main-all-summa p strong').html(fullsumma);	
	}

	var countcartProducts = 1;

	$(document).on('click', '.main-block-setting i.cart-setting-plus', function(){
		
		var imgProdect = $(this).parent().parent().parent().parent().parent().parent().find('img').attr('src');
		var nameProduct = $(this).parent().parent().parent().parent().parent().parent().find('h1').text();
		var descrtiptionProduct = $(this).parent().parent().parent().parent().parent().parent().find('p').text();
		var priceProduct = $(this).parent().parent().parent().parent().parent().find('strong.price-product-cart b').text();
		var idProduct = $(this).parent().parent().parent().parent().parent().parent().attr('data-cart-product-id');

		countcartProducts = parseInt($(this).parent().parent().parent().parent().find('.product-cart-count b').text());
		countcartProducts++;
		$(this).parent().parent().parent().parent().find('.product-cart-count b').text(countcartProducts);

		var jsonProduct = {
			name:nameProduct,
			description:descrtiptionProduct,
			image:imgProdect,
			price:parseInt(priceProduct),
			count:countcartProducts,
		};

		window.localStorage.setItem(idProduct,JSON.stringify(jsonProduct));	

		haveProduct();
		updatePrice();

	});


	$(document).on('click', '.main-block-setting i.cart-setting-minus', function(){

		countcartProducts = parseInt($(this).parent().parent().parent().parent().find('.product-cart-count b').text());

		if(countcartProducts > 1){	

			countcartProducts--;
			$(this).parent().parent().parent().parent().find('.product-cart-count b').text(countcartProducts);

			var imgProdect = $(this).parent().parent().parent().parent().parent().parent().find('img').attr('src');
			var nameProduct = $(this).parent().parent().parent().parent().parent().parent().find('h1').text();
			var descrtiptionProduct = $(this).parent().parent().parent().parent().parent().parent().find('p').text();
			var priceProduct = $(this).parent().parent().parent().parent().parent().find('strong.price-product-cart b').text();
			var idProduct = $(this).parent().parent().parent().parent().parent().parent().attr('data-cart-product-id');

			var jsonProduct = {
				name:nameProduct,
				description:descrtiptionProduct,
				image:imgProdect,
				price:parseInt(priceProduct),
				count:countcartProducts,
			};

			window.localStorage.setItem('item_'+idProduct,JSON.stringify(jsonProduct));	

			haveProduct();
			updatePrice();

		}



	});

	$(document).on('click', 'i.cart-setting-delete', function(){

		var idProduct = $(this).parent().parent().parent().parent().parent().parent().attr('data-cart-product-id');
		window.localStorage.removeItem(idProduct);
		$(this).parent().parent().parent().parent().parent().parent().addClass('delete-block-product-list');

		setTimeout(function(){
			haveProduct();
			updatePrice()
			updatecartContent();
		},350);

	});

	$(document).on('click', '.button-zakaz-user span', function(){
		var minsumma = parseInt($('h6.min-summa-app strong').text());
		var mainzakazsumma = parseInt($('.main-all-summa p strong').text());

		if(mainzakazsumma >= minsumma){
			
			mainView.router.loadPage('http://188.225.74.48/api/formcart');

		}else{

		    myApp.addNotification({
		        button: {
		            text: 'ok',
		            color: 'white'
		        },
		        message: 'Минимальная сумма заказа '+minsumma+' тг.'
		    });

		}

	});


	$(document).on('click', 'button.user-form-button', function(){


		var name = $('.input-user-name').val();
		var dostavka = $('ul.input-radio-dostavka li.active-dostavka').find('input').val();
		var phone = $('.input-user-phone').val();
		var email = $('.input-user-email').val();
		var home = $('.input-user-home').val();
		var street = $('.input-user-street').val();
		var podezd = $('.input-user-podezd').val();
		var itagh = $('.input-user-itagh').val();
		var kvartira = $('.input-user-kvartira').val();
		var listProducts = '';
		var companyName = $('p.company-name-text').text();

		var productsStorage = window.localStorage.length;
		var j = 0;
		var mainSumma = 0;
		var mainJsonPeoduct = {};

		for(j; j < productsStorage; j++){

			var keyProduct = window.localStorage.key(j);

			if(keyProduct){

				mainJsonPeoduct = JSON.parse(window.localStorage.getItem(keyProduct));

				listProducts = listProducts + '<div style="background:rgba(255, 255, 255, 0.18);width:100%;display:table;box-sizing:border-box;padding:10px;margin:5px 0"><div style="width:100%;padding:0;"><h1 style="color: #fff;text-shadow: 2px 1px 0 rgba(0, 0, 0, 0.34);">Наименование продукта: '+mainJsonPeoduct.name+'</h1></div><div style="width:100%;padding:0;"><h1 style="color: #fff;text-shadow: 2px 1px 0 rgba(0, 0, 0, 0.34);">Стоимость продукта: '+mainJsonPeoduct.price+' тг.</h1></div><div style="width:100%;padding:0;"><h1 style="color: #fff;text-shadow: 2px 1px 0 rgba(0, 0, 0, 0.34);">Количество: '+mainJsonPeoduct.count+'</h1></div></div>';

				mainSumma = mainSumma + (mainJsonPeoduct.price * mainJsonPeoduct.count);

			}

		}

		$(document).find('button.user-form-button').removeClass('user-form-button').addClass('user-form-button-send').text('Отправляем...');

		$.ajax({
			'url':'http://188.225.74.48/api/formcartadd',
			'type':'GET',
			'data':{
				'name':name,
				'dostavka':dostavka,
				'phone':phone,
				'email':email,
				'home':home,
				'companyName':companyName,
				'street':street,
				'podezd':podezd,
				'itagh':itagh,
				'kvartira':kvartira,
				'mainSumma':mainSumma,
				'listProducts':listProducts,
			},
			success:function(cart){			
				if(cart == 'ok'){
					myApp.alert('Ваша зяавка отпрвлена! Ожидайте');
					mainView.router.loadPage('http://188.225.74.48/api/index');
					$(document).find('button.user-form-button-send').removeClass('user-form-button-send').addClass('user-form-button').text('заказать');
					$('.form-page-content input').val('');
					window.localStorage.clear();
					haveProduct();
					updatePrice()
					updatecartContent();
				}else{
					myApp.alert('Заполните обязательные поля');
					$(document).find('button.user-form-button-send').removeClass('user-form-button-send').addClass('user-form-button').text('заказать');
				}
			}
		});

	});

	$(document).on('click', 'ul.input-radio-dostavka li',function(){
		$('ul.input-radio-dostavka li').removeClass('active-dostavka');
		$(this).addClass('active-dostavka');
	});

	$$(document).on('pageInit', function (e) {

	    var page = e.detail.page;

	    if (page.name === 'products') {
	    	haveProduct();
			updatePrice()
			updatecartContent();
	    }else if(page.name === 'cart'){
	    	updatecartContent();
	    	haveProduct();
	    	updatecart();

			$.ajax({
				'url':'http://188.225.74.48/api/summa',
				'type':'get',
				success:function(summa){
					$(document).find('h6.min-summa-app strong').html(summa);
				}
			});
	    }else if(page.name === 'settingspanel'){

	    	getTokenLogin();

	    }

	});

	$(document).on('click', 'span.user-reg-login-link', function(e){
	    myApp.closePanel();
	    var linkmain = $(this).attr('data-link');
	    mainView.router.loadPage(linkmain);
	});

	$(document).on('click', 'input.reg-submit-user', function(){
	    var name = $(document).find('input.user-reg-name').val();
	    var email = $(document).find('input.user-reg-email').val();
	    var password = $(document).find('input.user-reg-password').val();
	    var repassword = $(document).find('input.user-reg-repassword').val();
	    var promocode = $(document).find('input.user-reg-promocode').val();

	    $.ajax({
	        'url':'http://188.225.74.48/api/user/registerpost',
	        'type':'get',
	        'data':{
	            'name':name,
	            'email':email,
	            'password':password,
	            'repassword':repassword,
	            'promocode':promocode
	        },
	        success:function(data){
	           // var datajson = JSON.parse(data);
	                if(data.substr(0,2) == 'ok'){

	                	myApp.alert('Регистрация прошла успешно!');

	                }else if(data == 'error'){
                        alert('error');
	                }else{
	                    myApp.alert(data);
	                }

	        }
	    });

	});

	$(document).on('click', '.reg-login-submit',function(){
		var email = $(document).find('.user-login-email').val();
		var password = $(document).find('.user-login-password').val();

		$.ajax({
			'url':'http://188.225.74.48/api/user/auth',
			'type':'get',
			'data':{
				'email':email,
				'password':password
			},
			success:function(data){
				if(data == 'error'){
					myApp.alert('Ошибка, введеные вами данные неверны.');
				}else{
					var infouser = JSON.parse(data);

					createTokenLogin(infouser.api_token_user);

	    			getTokenLogin();

	    			myApp.alert('Авторизация прошла успешно!');

					mainView.router.back({
						ignoreCache:true
					});

				}
			}
		});

	});

	var db = openDatabase("settings", "0.1", "Настройки", 200000);

	function createTokenLogin(tokenuser){
	    db.transaction(function (tx) {
	        tx.executeSql('CREATE TABLE IF NOT EXISTS settings (name TEXT, value TEXT)');
	        tx.executeSql('INSERT INTO settings (name, value) VALUES ("token","'+tokenuser+'")');
	    });
	}

	function getTokenLogin(){
	    db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM settings',[],function(tx, res){
				var token = res.rows.item(res.rows.length-1).value;
				if(token != ''){
					$.ajax({
						'url':'http://188.225.74.48/api/user/userlogin',
						'type':'get',
						'data':{
							'tokenuser':token
						},
						success:function(user){
							var userContent = JSON.parse(user);
							$(document).find('.user-block-main').html('<h5>Аккаунт</h5><div class="clear-block"></div><h4>'+userContent.email+'</h4><div class="clear-block"></div><h4>Ваш промокод: <span>'+userContent.promo_code_user+'</span></h4><div class="clear-block"></div><h4>Скидка: <span>'+userContent.user_skidka+'%</span></h4><div class="clear-block"></div><h4>Приглашенных: '+userContent.referals_count+'</h4><div class="clear-block"></div><h4>Баланс: <span>'+userContent.balans_user+' тг.</span></h4><div class="clear-block"></div><h4 class="user-logout">выход</h4>');					
						}
					});
				}
			});
	    });
	}



	$(document).on('click', 'h4.user-logout', function(){

	    db.transaction(function (tx) {
	        tx.executeSql('DROP TABLE settings');
	    });

		$(document).find('.user-block-main').html('<span style="color:#fff;" data-link="http://188.225.74.48/api/user/registration" class="user-reg-login-link">Регистрация</span><span style="color:#fff;" data-link="http://188.225.74.48/api/user/login" class="user-reg-login-link">Авторизация</span>');

	});




	document.addEventListener("backbutton", function(){
		mainView.router.back();
	});

	document.addEventListener("menubutton", function(){
		myApp.alert('Онлайн заказ роллов');
	    var buttons = [
	        {
	            text: 'Выход',
	            bold: true,
	            onClick: function () {
                	navigator.app.exitApp();
            	}
	        }
	    ];
	    myApp.actions(buttons);
	});




