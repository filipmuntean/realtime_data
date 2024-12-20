# Use the official Ubuntu 20.04 image
FROM ubuntu:20.04

# Set non-interactive mode for apt to avoid prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    openjdk-8-jdk \
    openssh-server openssh-client \
    wget tar curl \
    mysql-client \
    libmysqlclient-dev libssl-dev python3-dev net-tools \
    && apt-get clean

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Install Hadoop
RUN mkdir -p /workarea/softwares && \
    wget -qO- https://dlcdn.apache.org/hadoop/common/hadoop-3.4.1/hadoop-3.4.1-src.tar.gz | tar -xz -C /workarea/softwares && \
    ln -s /workarea/softwares/hadoop-3.3.6 /workarea/softwares/hadoop

# Set Hadoop environment variables
ENV HADOOP_HOME=/workarea/softwares/hadoop
ENV PATH="$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH"

# Install Spark
RUN wget -qO- https://dlcdn.apache.org/spark/spark-3.5.3/spark-3.5.3-bin-hadoop3.tgz | tar -xz -C /workarea/softwares && \
    ln -s /workarea/softwares/spark-3.3.6-bin-hadoop3 /workarea/softwares/spark

# Set Spark environment variables
ENV SPARK_HOME=/workarea/softwares/spark
ENV PATH="$SPARK_HOME/bin:$SPARK_HOME/sbin:$PATH"

# Install Kafka
RUN wget -qO- https://dlcdn.apache.org/kafka/3.9.0/kafka-3.9.0-src.tgz | tar -xz -C /workarea/softwares && \
    ln -s /workarea/softwares/kafka_2.13-3.5.1 /workarea/softwares/kafka

# Set Kafka environment variables
ENV KAFKA_HOME=/workarea/softwares/kafka
ENV PATH="$KAFKA_HOME/bin:$PATH"

# Create working directories
RUN mkdir -p /workarea/code /workarea/data /workarea/logs

# Expose necessary ports (replace as needed)
EXPOSE 8088 9870 8000 9092 2181

# Set the default command to bash
CMD ["/bin/bash"]

