import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VERIFIED_bg from "../../../images/verified-bg copy.jpg";
import { useHistory } from "react-router-dom";

export default function MediaCard(props) {
  const history = useHistory();

  return (
    <div className="m-2">
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image={VERIFIED_bg}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => history.push(`${props.link}`)}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
