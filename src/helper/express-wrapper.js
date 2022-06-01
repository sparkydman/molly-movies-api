module.exports=(controller)=>(req,res)=>{
    controller(req)
      .then((httpRes) => {
        if (httpRes?.headers) res.set(httpRes.headers);
        res.type('json');
        res.status(httpRes?.status || 400).send(httpRes.body);
      })
      .catch(() => res.status(500).send('Network error'));
}