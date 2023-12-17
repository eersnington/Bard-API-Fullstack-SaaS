FROM amazonlinux:2

# Install dependencies
RUN yum update -y && \
    yum groupinstall "Development Tools" -y && \
    yum erase openssl-devel -y && \
    yum install openssl11 openssl11-devel  libffi-devel bzip2-devel wget -y

# Install Python 3.10
RUN wget https://www.python.org/ftp/python/3.10.13/Python-3.10.13.tgz && \
    tar xvf Python-3.10.13.tgz && \
    cd Python-3.10.13 && \
    ./configure --enable-optimizations && \
    make altinstall

# Set up PIP and Venv
RUN python3.10 -m pip install --upgrade pip && \
    python3.10 -m pip install virtualenv
RUN python3.10 -m venv base
RUN source base/bin/activate

# Install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

# Zip it up for deployment.
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]