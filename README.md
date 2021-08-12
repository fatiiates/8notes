<h1 align="center"> Scraping 8notes web site with NodeJS</h1>
<p align="center">
    <b> A scraping tool by instrument (classic), style or artist on 8notes website developed with NodeJS
    </b>
</p>

- [EN description](#en)  
- [TR açıklama](#tr)

# DEPENDENCIES/GEREKSİNİMLER

- NodeJS ^14.15.1
- npm ^6.14.8

# EN

# DESCRIPTION

A tool that allows you to capture music from the 8notes site. While the tool is shooting the music asynchronously, it can pull all the information of the music it pulls in a child thread.

&emsp;According to classical instruments by following

    + classical piano
    + classical guitar
    + classical violin
    + classical flute
    + classical saxophone
    + classical voice
    + classical clarinet
    + classical trumpet  

&emsp;or according to the following music styles

    + classical style
    + Rock and pop styles
    + christmas style  

&emsp; or by the following artists

    + classical Bach
    + classical Beethoven
    + classical Mozart
    + classical Tchaikovsky
    + classical Scott Joplin
    + classical Chopin  
    
a scraping tool that searches on the [8notes](https://www.8notes.com/) web site.

# INSTALL AND USAGE

## UBUNTU 20.04 için NodeJS 

### NODEJS KURULUMU

SIGN IN AS ROOT USER WHEN INSTALLING NODEJS

Run the following command to install NVM(Node Version Manager).

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

After NVM is successfully installed, run the following command or restart your machine to use NVM.

    source ~/.bashrc
    
or
    
    reboot
    
You can run the command below to find the NodeJS version to install. (If you know your version, you don't need to run the command.)

    nvm ls-remote
    
After you find your NodeJS version, you can install it on your server with the following command. (V14.15.1 is recommended)

    nvm install <nodejs_version>
    
After NodeJS is installed, you can test it with the ```node``` command.

When NodeJS is installed for root, run the script below to make it available to other users.

    n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local

## DEPENDENCY INSTALLING AND USAGE

## Chromedriver

By default, version 90.0.0 comes ready in Package json. If you have a different version of Chrome, you need to update this value.

1. Open your computer's command line interface.
2. Change directory to the directory where the repository is located.
3. To install the packages, first run the following command.

       npm i

4. To browse the site;

    - Run the following command to browse by instruments.

            node index.js search --style="<your_artist>"
    
    - Run the following command to browse by style.

            node index.js search --style="<your_style>"
    
    - Run the following command to browse by artist.

            node index.js search --style="<your_artist>"

    - Run the following command browse all music

            npm run-script stage-1

    - To pull in depth information of asynchronously scanned music while scanning all music

            npm run-script stage-2
    
5. Processes may take a little longer depending on your internet speed, your computer's characteristics and the speed of the site's response to requests.
6. The results are given as json type output under the outputs folder.


# TR

# AÇIKLAMA

8notes sitesinden müzikleri taramanızı sağlayan bir araç. Araç, müziği eşzamansız olarak çekerken, çektiği müziğin tüm bilgilerini bir child thread içinde çekebilir.

&emsp;Araca Komut satırından verilen argümanlara bakarak classical instrumentlara göre:

    + classical piano
    + classical guitar
    + classical violin
    + classical flute
    + classical saxophone
    + classical voice
    + classical clarinet
    + classical trumpet  

&emsp;veya komut satırından verilen argümanlara bakarak music stylelerine göre:

    + classical style
    + Rock and pop styles
    + christmas style  

&emsp; veya komut satırından verilen argümanlara bakarak artistlere göre:

    + classical Bach
    + classical Beethoven
    + classical Mozart
    + classical Tchaikovsky
    + classical Scott Joplin
    + classical Chopin  
    
arama yapan bir scraping aracı.

# KURULUM VE KULLANIM

## UBUNTU 20.04 için NodeJS 

### NODEJS KURULUMU
NODEJS KURARKEN ROOT KULLANICISI OLARAK OTURUM AÇIN  

NVM(Node Version Manager) kurulumu için çalıştırın.

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

NVM başarıyla kurulduktan sonra NVM'i kullanabilmek için aşağıdaki komutu çalıştırın ya da sunucunuzu yeniden başlatın.

    source ~/.bashrc
    
veya
    
    reboot
    
Daha sonra kuracağınız NodeJS sürümünü bulmak için aşağıdaki komutu çalıştırabilirsiniz.(Eğer sürümünüzü biliyorsanız komutu çalıştırmanıza gerek yok.)

    nvm ls-remote
    
Nodejs sürümünüzü bulduktan sonra aşağıdaki komut ile sunucunuza kurabilirsiniz.(V14.15.1 tavsiye edilir)

    nvm install <nodejs_sürümü>
    
NodeJS kurulduktan sonra ```node``` komutu ile test edebilirsiniz.

NodeJS root için kurulduğunda diğer kullanıcıların da kullanabilmesini sağlamak için aşağıdaki betiği çalıştırın.

    n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local

## ARAÇ KURULUMU ve KULLANIMI

## Chromedriver

Package json içerisinde varsayılan olarak 90.0.0 versiyonu hazır olarak gelmektedir. Eğer ki farklı bir Chrome sürümünüz mevcutsa bu değeri güncellemeniz gerekmektedir.

1. Bilgisayarınızın komut satırı arayüzünü açın.
2. Dizin değiştirerek deponun bulunduğu dizinin içine gelin.
3. Paketleri kurmak için öncelikle aşağıdaki komutu çalıştırın.

       npm i

4. Site üzerinde tarama yapmak için;

    - Enstrümanlara göre tarama yapmak için aşağıdaki komutu çalıştırın.

            node index.js search --style="<your_artist>"
    
    - Stile göre tarama yapmak için aşağıdaki komutu çalıştırın.

            node index.js search --style="<your_style>"
    
    - Sanatçıya göre tarama yapmak için aşağıdaki komutu çalıştırın.

            node index.js search --style="<your_artist>"

    - Tüm müzikleri taramak için aşağıdaki komutu çalıştırın.

            npm run-script stage-1

    - Müzikler bir yandan taranırken, taranmış müziklerin bilgilerini asenkron bir şekilde derinlemesine çekmek için aşağıdaki komutu çalıştırın.

            npm run-script stage-2

    
5. İşlemler internet hızınıza, bilgisayarınızın özelliklerine ve sitenin isteklere yanıt verme hızına göre biraz uzun sürebilir.

6. Sonuçlar outputs klasörü altında json türünde çıktı olarak verilmektedir.