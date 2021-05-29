<h1 align="center"> Scraping 8notes web site with NodeJS</h1>
<p align="center">
    <b> A scraping tool by instrument (classic), style or artist on 8notes website developed with NodeJS
    </b>
</p>

- [EN description](#en)  
- [TR açıklama](#tr)

# EN

&emsp; There will be a translation here.

# TR

# GEREKSİNİMLER

- NodeJS ^14.15.1
- npm ^6.14.8

# AÇIKLAMA

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

    ## NODEJS KURULUMU
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
    
NodeJS kurulduktan sonra 'node' komutu ile test edebilirsiniz.

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

    - İkinci aşama için aşağıdaki komutu çalıştırın.

            npm run-script stage-2
    
5. İşlemler internet hızınıza, bilgisayarınızın özelliklerine ve sitenin isteklere yanıt verme hızına göre biraz uzun sürebilir.

