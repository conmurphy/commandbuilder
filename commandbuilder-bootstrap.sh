#!/bin/bash



echo "installing and configuring NTP"
yum -y install ntp ntpdate ntp-doc
sudo chkconfig ntpd on
sudo service ntpd start

echo "installing epel-release"
sudo yum -y install epel-release

echo "installing node"
rpm -Uvh https://rpm.nodesource.com/pub_4.x/el/7/x86_64/nodesource-release-el7-1.noarch.rpm
sudo yum -y install nodejs
sudo yum -y install npm

echo "updating iptables"
sudo iptables -A INPUT -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
sudo iptables -A OUTPUT -o eth0 -p tcp --sport 80 -m state --state ESTABLISHED -j ACCEPT
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

cd /opt/commandbuilder/
	

echo "installing npm packages"
npm install


