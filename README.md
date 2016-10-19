# openvidu-sample-basic-plainjs

This is an OpenVidu sample SPA web page implemented in plain JavaScript (without any framework). 

## Start OpenVidu service

To develop a OpenVidu app you have to start OpenVidu services. These services are included in a single docker image to make easy develop apps. To start the services be sure you have docker installed and execute:

<pre>
docker run -p 8443:8443 --rm openvidu/openvidu-server-kms
</pre>

## Execute sample application

You need an http web server to execute the application. If you are using node, you can use [http-server](https://github.com/indexzero/http-server). It can be installed with:

<pre>
npm install http-server -g
</pre>

And executed in the project folder with:

<pre>
http-server ./web
</pre>

Then you can go to `http://127.0.0.1:8080` to see the web app.


