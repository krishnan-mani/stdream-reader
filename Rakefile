require 'aws-sdk-dynamodb'
require 'date'


MAX_ITEM_COUNT = 25

desc 'Put item in table'
task :put_item, [:table, :region, :item_count] do |t, args|

  table = args.table or raise 'Table name not provided'
  region = args.region or raise 'AWS region not provided'
  item_count = [args.item_count.to_i || MAX_ITEM_COUNT, MAX_ITEM_COUNT].min

  items = 1.upto(item_count).collect do |n|
    {put_request: {item: {"id": "#{DateTime.now.to_s}-#{n}"}}}
  end

  client = Aws::DynamoDB::Client.new(region: region)
  client.batch_write_item({
                              request_items: {
                                  "#{table}": items
                              },
                              return_item_collection_metrics: "SIZE"
                          })

end