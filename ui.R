ui = shinyUI(
        fluidPage(
                titlePanel(HTML(paste(" Road transport of Luxembourg steel products by country of destination,","1952-2000", sep="<br/>"))),
                h5("Integration of d3.js in Shiny"),
                #Checkbox boutton to choose countries
                checkboxGroupInput("countrybox",
                                   "Countries seleced:",
                                   c("Luxembourg",
                                     "Holland",
                                     "Germany",
                                     "France",
                                     "Belgium",
                                     "Other countries in E.U"), selected =c("Germany", "France", "Belgium")),
                actionButton("runButton", "Run"),
                fluidRow(
                        #source .js and .css files
                        tags$head(tags$link(rel = "stylesheet", type = "text/css", href = "stylesheet2.css")),
                        tags$head(tags$script(src="d3.min.js")),
                        #here we precise where the graph from d3.js will be drawn
                        column(width=12,align="center", 
                               tags$script(src="multiLines.js"), tags$div(id="multiLines")),
                        
                        h6( a("Data sources", href="http://www.statistiques.public.lu/stat/TableViewer/tableView.aspx?ReportId=13511&IF_Language=eng&MainTheme=4&FldrName=7&RFPath=7049%2c13897%2c13898%2c13899"))
                        
                )        ))
