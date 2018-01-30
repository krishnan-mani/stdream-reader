Respond to item changes in a DynamoDB table by [subscribing a Lambda function to DynamoDB Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)

Contents
===

- Provisions a stack named ["st(d)ream-reader"](template.yaml) for the workload consisting of a DynamoDB table with streams enabled, and a Lambda function subscribed to the stream
- Another stack ["test-function"](test-function/template.yaml) provisions a test fixture with Scheduled CloudWatch Event Rules that invoke a Lambda function at intervals to put new items in the table
- Also includes a [```Rake``` task](Rakefile) to put multiple items into the table

HOW-TO
===

- Provision the workload

```
# Assuming "my-artifacts-bucket" is the S3 bucket used when packaging and deploying the SAM transform

stdream-reader $ sam package --s3-bucket my-artifacts-bucket --template-file template.yaml --output-file output-template.yaml
stdream-reader $ sam deploy --template-file output-template.yaml --stack-name stdream-reader-test --capabilities CAPABILITY_IAM 

```

- Test putting some items in the table

```
# Get table name

stdream-reader $ aws cloudformation describe-stacks --stack-name stdream-reader-test --query "Stacks[0].Outputs[0].OutputValue" --output text

# Use the rake task to put items

stdream-reader $ rake -D put_item
rake put_item[table,region,item_count]
    Put multiple items in DynamoDB table (upto a maximum of 25) using batch_write_item

# Assuming table name is "my-table" in region "us-east-1", run rake task as follows
stdream-reader $ rake put_item["my-table", "us-east-1", 20]

```

- Provision the test fixture

```
stdream-reader $ cd test-function
test-function $ sam package --s3-bucket my-artifacts-bucket --template-file template.yaml --output-file output-template.yaml
test-function $ sam deploy --template-file output-template.yaml --stack-name write-function-test --parameter-overrides StackName=stdream-reader-test --capabilities CAPABILITY_IAM 

```

TODO
===

- [ ] Illustrate responding to different kinds of changes
- [ ] Implement [TTL and process deleted items](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/time-to-live-ttl-streams.html)
- [ ] Provision a CloudWatch dashboard for monitoring
- [ ] Elaborate on batch size, iterator age and other aspects of stream processing
