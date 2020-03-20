var config = {
	type: Phaser.AUTO,
	width: 1600,
	height: 1200,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 2;
var jump = 0;


function init(){
 	var platforms;
	var player;
	var cursors; 
	var stars;
	var porteO;
	var porteF;
	var boisP;
	var entre;
}

function preload(){
	this.load.image('background1','assets/background1.png');
	this.load.image('background1x','assets/background1x.png');
	this.load.image('background2','assets/background2.png');
	this.load.image('background3','assets/background3.png');
	this.load.image('background3x','assets/background3x.png');
	this.load.image('background4','assets/background4.png');

	this.load.image('sol1','assets/sol1.png');	
	this.load.image('sol2','assets/sol2.png');	
	this.load.image('sol3','assets/sol3.png');
	this.load.image('buche','assets/buche.png');
	this.load.image('marche1','assets/marche1.png');
	this.load.image('marche2','assets/marche1.png');
	this.load.image('porteF','assets/porte-F.png');
	this.load.image('porteO','assets/porte-O.png');
	this.load.image('branche','assets/branche.png');
	this.load.image('bois','assets/bois.png');
	this.load.image('bois2','assets/bois2.png');
	this.load.image('meuble1','assets/meuble1.png');
	this.load.image('manette','assets/manette.png');
	this.load.image('enceinte','assets/enceinte.png');
	this.load.image('ordi','assets/ordi.png');
	this.load.image('tableau','assets/tableau.png');
	this.load.image('armoire1','assets/armoire1.png');
	this.load.image('poing','assets/poing.png');
	this.load.image('plat','assets/plat.png');
	this.load.image('entre','assets/entre.png');
	this.load.image('ds','assets/DS.png');

	this.load.spritesheet('perso','assets/perso.png',{frameWidth: 12, frameHeight: 24});

}



function create(){
	platforms = this.physics.add.staticGroup();
	porteF = this.physics.add.staticGroup();
	entre = this.physics.add.staticGroup();

	this.add.image(400,935,'background1');
	this.add.image(345,-188,'background1x');
	this.add.image(1975,900,'background2');
	this.add.image(3600,900,'background3');
	this.add.image(3590,-213,'background3x');
	this.add.image(5200,950,'background4');


			platforms.create(300,1350,'branche');	
			platforms.create(370,1200,'branche');
			platforms.create(200,1100,'branche');
			platforms.create(350,1000,'branche');
			platforms.create(380,850,'branche');
			platforms.create(470,700,'branche');
			platforms.create(570,550,'branche');
			platforms.create(700,450,'branche');
			platforms.create(400,340,'branche');
			platforms.create(900,350,'branche');
			platforms.create(980,210,'branche');
			platforms.create(400,150,'branche');
			platforms.create(0,200,'branche');

			platforms.create(5350,1315,'poing');
			platforms.create(5850,1360,'poing');
			platforms.create(5450,1050,'poing');
			platforms.create(5750,900,'poing');
			platforms.create(5750,750,'poing');

			platforms.create(400,1480,'sol1');
			platforms.create(2000,1480,'sol2');
			platforms.create(3600,1480,'sol3');
			platforms.create(5200,1480,'sol3');


			platforms.create(4430,1110,'branche');

	entre.create(4688,505,'entre');

	platforms.create(1080,1440,'buche');
	platforms.create(2616,1435,'marche1');
	platforms.create(2987,1435,'marche2');
	platforms.create(3690,1028,'meuble1');
	platforms.create(4350,1428,'manette');
	platforms.create(4080,1255,'enceinte');
	platforms.create(4900,1300,'ordi');
	platforms.create(5000,800,'tableau');
	platforms.create(4500,800,'armoire1');
	platforms.create(4618,630,'plat');
	platforms.create(4618,1380,'ds');

	porteF.create(2755,709,'porteF');
	porteO = this.add.image(3000,740,'porteO');

	


	
	player = this.physics.add.sprite(0,1400,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0);
	player.body.setGravityY(0);


    this.cameras.main.setBounds(0, 0, 4000 * 2, 1080 * 2);
    this.physics.world.setBounds(0, 0, 4000 * 2, 1080 * 2);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);


	cursors = this.input.keyboard.createCursorKeys(); 


			this.physics.add.collider(player,platforms);
			this.physics.add.overlap(player,porteF);
			this.physics.add.overlap(player,entre);



	
	this.anims.create({
		key:'right',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: [{key: 'perso', frame:4}],
		frameRate: 20
	});
	
	stars = this.physics.add.group({
		key: 'bois',
		repeat:1,
		setXY: {x:0,y:180,stepX:990,stepY:0}

	});

	boisP = this.physics.add.group({
		key: 'bois2',
		repeat:100,
		setXY: {x:880,y:1300}

	});
	
	
	this.physics.add.collider(stars,platforms);
	this.physics.add.collider(boisP,platforms);
//	this.physics.add.overlap(player,boisP,porte,null,this);
	this.physics.add.overlap(player,stars,collectStar,null,this);




}



function update(){
	if 	(cursors.left.isDown){
		player.anims.play('right', true);
		player.setVelocityX(-300);
		player.setFlipX(true);
	}
	else if (cursors.right.isDown){
			player.setVelocityX(300);
			player.anims.play('right', true);
			player.setFlipX(false);
	}
	else{
			player.anims.play('stop', true);
			player.setVelocityX(0);
	}

//Double Jump

		if	(cursors.up.isDown && player.body.touching.down){
			player.setVelocityY(-300);
		} 
		if  (player.body.touching.down) {
			jump = 0;
		}

		if 	(cursors.up.isDown && player.body.touching.down){
			player.setVelocityY(-250);
		}

		if 	(cursors.up.isUp && !player.body.touching.down && jump == 0){
			jump = 1;
		}

			
}







function collectStar(player, star){
	star.disableBody(true,true);
	score = score -1;	
}


//	if (score == 0){
//		porteF.setAlpha(0)
//		this.physics.add.overlap(player, porteF, null,this);
//		porteO.visible = true; 
//	}
//}


//function chrono(player){
//	chrono lancé
///	écran éteint
//	et overlap
//	chrono finit
//	collider
//
//}