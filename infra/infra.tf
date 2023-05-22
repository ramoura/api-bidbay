# AWS infrastructure resources
resource "aws_vpc" "bidbay_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags                 = {
    Name = "${var.prefix}-bidbay-vpc"
  }
}

resource "aws_internet_gateway" "bidbay_gateway" {
  vpc_id = aws_vpc.bidbay_vpc.id

  tags = {
    Name = "${var.prefix}-bidbay-gateway"
  }
}

resource "aws_subnet" "bidbay_subnet_b" {
  vpc_id = aws_vpc.bidbay_vpc.id

  cidr_block        = "10.0.0.0/24"
  availability_zone = var.aws_zone

  tags = {
    Name = "${var.prefix}-bidbay-subnet"
  }
}

resource "aws_subnet" "bidbay_subnet_a" {
  vpc_id = aws_vpc.bidbay_vpc.id

  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "${var.prefix}-bidbay-subnet"
  }
}

resource "aws_route_table" "bidbay_route_table" {
  vpc_id = aws_vpc.bidbay_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.bidbay_gateway.id
  }

  tags = {
    Name = "${var.prefix}-bidbay-route-table"
  }
}

resource "aws_route_table_association" "bidbay_route_table_association_a" {
  subnet_id      = aws_subnet.bidbay_subnet_a.id
  route_table_id = aws_route_table.bidbay_route_table.id
}

resource "aws_route_table_association" "bidbay_route_table_association_b" {
  subnet_id      = aws_subnet.bidbay_subnet_b.id
  route_table_id = aws_route_table.bidbay_route_table.id
}

# Security group to allow all traffic
resource "aws_security_group" "bidbay_sg_allowall" {
  name        = "${var.prefix}-bidbay-allowall"
  description = "bidbay quickstart - allow all traffic"
  vpc_id      = aws_vpc.bidbay_vpc.id

  ingress {
    from_port   = "0"
    to_port     = "0"
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = "0"
    to_port     = "0"
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Creator = "bidbay-quickstart"
  }
}

# Role for the Lambda function
resource "aws_iam_role" "bidbay_lambda_role" {
  name = "${var.prefix}-bidbay-lambda-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "bidbay_lambda_policy" {
  name        = "bidbay-lambda-policy"
  description = "Policy for BidBay Lambda function"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "logs:CreateLogGroup",
        "logs:CreateLogStream"
       ],
      "Resource": "*"
    }
  ]
}
EOF
}
resource "aws_iam_role_policy_attachment" "bidbay_lambda_role_policy_attachment" {
  role       = aws_iam_role.bidbay_lambda_role.name
  policy_arn = aws_iam_policy.bidbay_lambda_policy.arn
}

# Lambda function to create the DynamoDB table
resource "aws_lambda_function" "bidbay_lambda" {
  filename         = "../bidbay_lambda.zip"
  function_name    = "${var.prefix}-bidbay-lambda"
  role             = aws_iam_role.bidbay_lambda_role.arn
  handler          = "build/infra/lambda/function.minhaFuncao"
  source_code_hash = filebase64sha256("../bidbay_lambda.zip")
  runtime          = "nodejs14.x"
  timeout          = 60
  vpc_config {
    security_group_ids = [aws_security_group.bidbay_sg_allowall.id]
    subnet_ids         = [aws_subnet.bidbay_subnet_a.id, aws_subnet.bidbay_subnet_b.id]
  }

  environment {
    variables = {
      DB_CONN_STRING = "mongodb+srv://renatomoura:tb3OeUvLJ6oItSnb@cluster0.8tdxbyx.mongodb.net/?retryWrites=true&w=majority"
    }
  }

  tags = {
    Name = "${var.prefix}-bidbay-lambda"
  }
}
