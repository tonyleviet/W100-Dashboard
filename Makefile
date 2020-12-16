init:
	npm install
	npm run start

dev_up:
	node -v
	npm run start

build:
	ng build
	cd ./dist && zip -r -X "../new_build.zip" * && open ../

hotel:
	hotel add http://localhost:4200 --name dxp-admin

backup_git:
	if [ -d ".git" ]; then \
	mv -v .git .git_bk; \
	fi

install_rs_module:
	git clone git@github.com:Mcmtechnologies/DXP_Admin_Module_RS.git
	rm -rf ./src/app/modules/relation_shop
	mkdir ./src/app/modules/relation_shop
	cp -r ./DXP_Admin_Module_RS/. ./src/app/modules/relation_shop/ && rm -rf ./DXP_Admin_Module_RS

install_promotion_module:
	git clone git@github.com:Mcmtechnologies/DXP_Admin_Module_Promotion.git
	rm -rf ./src/app/modules/promotion
	mkdir ./src/app/modules/promotion
	cp -r ./DXP_Admin_Module_Promotion/. ./src/app/modules/promotion/ && rm -rf ./DXP_Admin_Module_Promotion

install_marketing_module:
	git clone git@github.com:Mcmtechnologies/DXP_Admin_Module_Marketing.git
	rm -rf ./src/app/modules/e-marketing
	mkdir ./src/app/modules/e-marketing
	cp -r ./DXP_Admin_Module_Marketing/. ./src/app/modules/e-marketing/ && rm -rf ./DXP_Admin_Module_Marketing
  
install_ecom_module:
	git clone git@github.com:Mcmtechnologies/DXP_Admin_Module_eCom.git
	rm -rf ./src/app/modules/e-com
	mkdir ./src/app/modules/e-com
	cp -r ./DXP_Admin_Module_eCom/. ./src/app/modules/e-com/ && rm -rf ./DXP_Admin_Module_eCom

install_all_modules: install_rs_module install_promotion_module install_marketing_module install_ecom_module

deploy:
	git pull
	git clone git@github.com:Mcmtechnologies/DXP_Admin_Module_RS.git
	git clone git@github.com:Mcmtechnologies/DXP_Admin_Module_Promotion.git
	git clone git@github.com:Mcmtechnologies/DXP_Admin_Module_Marketing.git
	rm -rf src/app/modules/relation_shop/*
	rm -rf src/app/modules/promotion/*
	rm -rf src/app/modules/marketing/*
	cp -vr DXP_Admin_Module_RS/* src/app/modules/relation_shop && rm -rf src/app/modules/relation_shop/.git
	cp -vr DXP_Admin_Module_Promotion/* src/app/modules/promotion && rm -rf src/app/modules/promotion/.git
	cp -vr DXP_Admin_Module_Marketing/* src/app/modules/marketing && rm -rf src/app/modules/marketing/.git
	rm -rf DXP_Admin_Module_RS/
	rm -rf DXP_Admin_Module_Promotion/
	rm -rf DXP_Admin_Module_Marketing/
	npm install
	npm run build
	rm -rf /smb_GeneralQC/emarketing/prod1-dxpadmin.relationshop.net/*
	cp -vr dist/* /smb_GeneralQC/emarketing/prod1-dxpadmin.relationshop.net/

dxp_docker_run:
	docker build -t dxp-angular-image .
	docker run --name dxp-container -d -p 8888:80 dxp-angular-image

dxp_docker_start:
	docker start dxp-container

dxp_docker_ssh:
	docker exec -it dxp-container bin/sh

dxp_docker_stop:
	docker stop dxp-container
